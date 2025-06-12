import { useState, useEffect, useMemo } from "react";
import { lowercase } from "../../../utils/lowercase";
import { Set } from "../../../types";
import { setSets, getSets, selectSet } from "../optionsSlice";
import { useSelector, useDispatch } from "react-redux";
import { OptionRow } from "../../../components/optionRow";
import { LoadingOptions } from "../../../components/loadingOptions";
import Chip from "@mui/material/Chip";

export const SetFilter = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const sets = useSelector(getSets);
  const fetchSets = async () => {
    try {
      const response = await fetch("https://api.lorcana-api.com/sets/all");
      if (response.ok) {
        const sets = await response.json();
        const filteredSets = sets
          .map((set: Set) => {
            return {
              ...lowercase(set),
              selected: true,
            };
          })
          .filter((set: Set) => set.setId !== "QU1")
          .sort((a: Set, b: Set) => {
            if (a.setNum > b.setNum) {
              return 1;
            } else {
              return -1;
            }
          });
        dispatch(setSets(filteredSets));
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (isLoading && Object.keys(sets).length === 0) {
    fetchSets();
  }

  return (
    <>
      <OptionRow label="Sets">
        <div className="text-center flex flex-wrap xl:flex-nowrap justify-evenly">
          {Object.keys(sets).length !== 0 ? (
            Object.keys(sets).map((setKey) => {
              const set = sets[setKey];
              return (
                <div
                  className="mr-1 mb-1 md:mb-0 inline-block grow"
                  key={set.name}
                >
                  <Chip
                    label={set.name}
                    variant={set.selected ? "outlined" : "filled"}
                    onClick={() =>
                      dispatch(
                        selectSet({
                          ...sets,
                          [set.setId]: {
                            ...set,
                            selected: !set.selected,
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
