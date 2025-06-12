import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSet,
  getSets,
  setColors,
  getColors,
  setTypes,
  getTypes,
} from "../optionsSlice";
import { Set, Color, Type } from "../../../types";

export const SelectAllButtons = () => {
  const dispatch = useDispatch();
  const sets = useSelector(getSets);
  const colors = useSelector(getColors);
  const types = useSelector(getTypes);

  const swapSelected = (value: boolean) => {
    const flippedSets = Object.keys(sets).reduce<{ [key: string]: Set }>(
      (acc, curr) => {
        const setObj = sets[curr];
        return {
          ...acc,
          [setObj.setId]: {
            ...setObj,
            selected: value,
          },
        };
      },
      {}
    );
    const flippedColors = Object.keys(colors).reduce<{ [key: string]: Color }>(
      (acc, curr) => {
        const colorObj = colors[curr];
        return {
          ...acc,
          [colorObj.name]: {
            ...colorObj,
            selected: value,
          },
        };
      },
      {}
    );
    const flippedTypes = Object.keys(types).reduce<{ [key: string]: Type }>(
      (acc, curr) => {
        const typeObj = types[curr];
        return {
          ...acc,
          [typeObj.name]: {
            ...typeObj,
            selected: value,
          },
        };
      },
      {}
    );

    dispatch(selectSet(flippedSets));
    dispatch(setColors(flippedColors));
    dispatch(setTypes(flippedTypes));
  };

  return (
    <>
      <div className="mr-2">
        <Button variant="outlined" onClick={() => swapSelected(true)}>
          Select All
        </Button>
      </div>
      <div>
        <Button variant="outlined" onClick={() => swapSelected(false)}>
          Unselect All
        </Button>
      </div>
    </>
  );
};
