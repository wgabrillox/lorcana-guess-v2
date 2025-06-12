import { useState } from "react";
import { Color } from "../../../types";
import { setColors, getColors } from "../optionsSlice";
import { useSelector, useDispatch } from "react-redux";
import { OptionRow } from "../../../components/optionRow";
import { LoadingOptions } from "../../../components/loadingOptions";
import Checkbox from "@mui/material/Checkbox";
import { colorIconBackgroundColor, IMAGES } from "../../../constants";
import FormControlLabel from "@mui/material/FormControlLabel";

export const ColorFilter = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const colors = useSelector(getColors);

  const fetchColors = () => {
    const colors = Object.keys(colorIconBackgroundColor).reduce<{
      [key: string]: any;
    }>(
      (colors: Color, color) => ({
        ...colors,
        [color]: {
          name: color,
          color: colorIconBackgroundColor[color.toLowerCase()],
          image: IMAGES[color],
          selected: true,
        },
      }),
      {}
    );

    setIsLoading(false);
    dispatch(setColors(colors));
  };

  if (Object.keys(colors).length === 0) {
    fetchColors();
  }

  return (
    <>
      <OptionRow label="Colors">
        <div className="text-center flex">
          {Object.keys(colors).length !== 0 ? (
            Object.keys(colors).map((colorKey) => {
              const color = colors[colorKey];
              return (
                <FormControlLabel
                  sx={{
                    margin: "0px",
                  }}
                  key={colorKey}
                  control={
                    <Checkbox
                      id={colorKey}
                      checked={color.selected}
                      icon={
                        <img
                          src={color.image}
                          alt={`${color} icon`}
                          className="w-7 h-8"
                        />
                      }
                      checkedIcon={
                        <img
                          src={color.image}
                          alt={`${colorKey} icon`}
                          className="w-7 h-8"
                        />
                      }
                      onChange={() =>
                        dispatch(
                          setColors({
                            ...colors,
                            [color.name]: {
                              ...color,
                              selected: !color.selected,
                            },
                          })
                        )
                      }
                      sx={{
                        "&.Mui-checked": {
                          bgcolor: color.color,
                        },
                      }}
                    />
                  }
                  label=""
                />
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
