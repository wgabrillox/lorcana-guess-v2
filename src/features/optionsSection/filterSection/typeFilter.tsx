import { useState } from "react";
import { Type } from "../../../types";
import { setTypes, getTypes } from "../optionsSlice";
import { useSelector, useDispatch } from "react-redux";
import { OptionRow } from "../../../components/optionRow";
import { LoadingOptions } from "../../../components/loadingOptions";
import Chip from "@mui/material/Chip";

export const TypeFilter = () => {
  const dispatch = useDispatch();
  const typeList = ["Action", "Song", "Character", "Item", "Location"];
  const [isLoading, setIsLoading] = useState(true);
  const types = useSelector(getTypes);
  const fetchTypes = () => {
    const types = typeList.reduce<{
      [key: string]: any;
    }>(
      (types: Type, type) => ({
        ...types,
        [type]: {
          name: type,
          selected: true,
        },
      }),
      {}
    );
    setIsLoading(false);
    dispatch(setTypes(types));
  };

  if (isLoading && Object.keys(types).length === 0) {
    fetchTypes();
  }

  return (
    <>
      <OptionRow label="Types">
        <div className="text-center flex">
          {Object.keys(types).length !== 0 ? (
            Object.keys(types).map((typeKey) => {
              const type = types[typeKey];
              return (
                <div className="mr-1 mb-1 md:mb-0 inline-block" key={type.name}>
                  <Chip
                    label={type.name}
                    variant={type.selected ? "outlined" : "filled"}
                    onClick={() =>
                      dispatch(
                        setTypes({
                          ...types,
                          [type.name]: {
                            ...type,
                            selected: !type.selected,
                          },
                        })
                      )
                    }
                  />
                </div>
              );
            })
          ) : (
            <LoadingOptions />
          )}
        </div>
      </OptionRow>
    </>
  );
};
