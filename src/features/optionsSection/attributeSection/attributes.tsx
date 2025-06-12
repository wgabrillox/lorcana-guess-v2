import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttributes, selectAttribute, getAttributes } from "../optionsSlice";
import { OptionRow } from "../../../components/optionRow";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export const Attributes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const attributes = useSelector(getAttributes);

  const easyAttributes = ["name", "color", "type"];
  const normalAttributes = ["cost", "lore", "inkable"];
  const hardAttributes = [
    { attribute: "willpower" },
    { attribute: "strength" },
    { attribute: "moveCost", label: "Move Cost" },
    { attribute: "bodyText", label: "Body Text" },
  ];

  const selectDifficultyLevel = (mode?: string) => {
    switch (mode) {
      case "easy":
        dispatch(
          setAttributes({
            bodyText: false,
            color: true,
            cost: false,
            inkable: false,
            name: true,
            type: true,
            lore: false,
            strength: false,
            willpower: false,
            moveCost: false,
          })
        );
        break;
      case "normal":
        dispatch(
          setAttributes({
            bodyText: false,
            color: true,
            cost: true,
            inkable: true,
            name: true,
            type: true,
            lore: true,
            strength: false,
            willpower: false,
            moveCost: false,
          })
        );
        break;
      case "hard":
        dispatch(
          setAttributes({
            bodyText: true,
            color: true,
            cost: true,
            inkable: true,
            name: true,
            type: true,
            lore: true,
            strength: true,
            willpower: true,
            moveCost: true,
          })
        );
        break;
      default:
        dispatch(
          setAttributes({
            bodyText: false,
            color: false,
            cost: false,
            inkable: false,
            name: false,
            type: false,
            lore: false,
            strength: false,
            willpower: false,
            moveCost: false,
          })
        );
    }
  };

  if (isLoading && Object.keys(attributes).length === 0) {
    selectDifficultyLevel("normal");
    setIsLoading(false);
  }

  const uppercaseFirstLetter = (value: string) =>
    value.charAt(0).toUpperCase() + value.substring(1);

  return (
    <div className="w-fit border mx-auto p-3 rounded-md mb-2">
      <div className="flex flex-colr justify-center">
        <div className="w-fit mx-auto">
          <OptionRow label="Easy">
            <div className="text-center flex">
              {easyAttributes.map((attKey) => (
                <div className="mr-1 mb-1 md:mb-0 inline-block" key={attKey}>
                  <Chip
                    label={uppercaseFirstLetter(attKey)}
                    variant={attributes[attKey] ? "outlined" : "filled"}
                    onClick={() =>
                      dispatch(
                        selectAttribute({
                          [attKey]: !attributes[attKey],
                        })
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </OptionRow>
          <OptionRow label="Normal">
            <div className="text-center flex">
              {normalAttributes.map((attKey) => (
                <div className="mr-1 mb-1 md:mb-0 inline-block" key={attKey}>
                  <Chip
                    label={uppercaseFirstLetter(attKey)}
                    variant={attributes[attKey] ? "outlined" : "filled"}
                    onClick={() =>
                      dispatch(
                        selectAttribute({
                          [attKey]: !attributes[attKey],
                        })
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </OptionRow>
          <OptionRow label="Hard">
            <div className="text-center flex flex-wrap">
              {hardAttributes.map((attKey) => {
                const label = attKey.label ? attKey.label : attKey.attribute;
                return (
                  <div
                    className="mr-1 mb-1 md:mb-0 inline-block grow"
                    key={label}
                  >
                    <Chip
                      label={uppercaseFirstLetter(label)}
                      variant={
                        attributes[attKey.attribute] ? "outlined" : "filled"
                      }
                      onClick={() =>
                        dispatch(
                          selectAttribute({
                            [attKey.attribute]: !attributes[attKey.attribute],
                          })
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          </OptionRow>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mr-2">
          <Button
            variant="outlined"
            onClick={() => selectDifficultyLevel("easy")}
          >
            Easy
          </Button>
        </div>
        <div className="mr-2">
          <Button
            variant="outlined"
            onClick={() => selectDifficultyLevel("normal")}
          >
            Normal
          </Button>
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={() => selectDifficultyLevel("hard")}
          >
            Hard
          </Button>
        </div>
      </div>
    </div>
  );
};
