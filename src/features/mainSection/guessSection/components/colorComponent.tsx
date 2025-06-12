import { FormLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Option } from "../../../../types";
import { IMAGES, colorIconBackgroundColor } from "../../../../constants";
import {
  setGuessOptions,
  getGuessValue,
  getCardOptions,
  getType,
  getIncorrectGuesses,
  getDual,
} from "../../mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

type Props = {
  label: string;
  keyLabel?: string;
  disabled: boolean;
  showIncorrect: boolean;
};

export const formLabelProps = {
  color: "text.primary",
  fontWeight: "bold",
};

export const ColorComponent = (props: Props) => {
  const { label, keyLabel, disabled, showIncorrect } = props;

  const dispatch = useDispatch();
  const cardOptions = useSelector(getCardOptions);
  const optionKey = keyLabel ? keyLabel : label.toLowerCase();

  let guessValue = useSelector((state: RootState) =>
    getGuessValue(state, optionKey)
  );
  const incorrectGuess = useSelector(getIncorrectGuesses)[optionKey];

  const type = useSelector(getType);
  const isDual = useSelector(getDual) || (disabled && guessValue.length === 2);

  const controlProps = (option: Option) => ({
    checked: guessValue.includes(option.value.toLowerCase()),
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.toLowerCase();
      let newValue = guessValue;
      if (type !== "Location" && isDual) {
        if (guessValue.includes(value)) {
          if (guessValue.length !== 1) {
            newValue = guessValue.filter(
              (val: string) => val.toLowerCase() !== value
            );
          }
        } else {
          if (guessValue.length !== 2) {
            newValue = [...guessValue, value];
          }
        }
      } else {
        newValue = [value];
      }

      dispatch(setGuessOptions({ optionKey, value: newValue }));
    },
    value: option.value,
  });

  return (
    <div className="flex items-center">
      <FormLabel
        sx={formLabelProps}
        error={incorrectGuess && showIncorrect}
        disabled={disabled}
      >
        Color:
      </FormLabel>
      <div className="flex grow">
        <div className="flex grow justify-center">
          <div className="flex w-[132px] flex-nowrap sm:flex-wrap grow sm:grow-[0] items-center ">
            {cardOptions.color.map(
              (color) =>
                color.value !== "Dual" && (
                  <Checkbox
                    {...controlProps(color)}
                    key={color.value}
                    checkedIcon={
                      <img
                        src={IMAGES[color.label.toLowerCase()]}
                        alt={`${color.label} icon`}
                      />
                    }
                    icon={
                      <img
                        src={IMAGES[color.label.toLowerCase()]}
                        alt={`${color.label} icon`}
                      />
                    }
                    sx={{
                      width: 44,
                      height: 44,
                      margin: 0,

                      "&.Mui-checked": {
                        bgcolor:
                          colorIconBackgroundColor[color.label.toLowerCase()],
                      },
                    }}
                    disabled={disabled}
                  />
                )
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center border-l-1 border-slate-500 px-4 w-[70px] items-center">
          <div className={`font-bold ${disabled && "opacity-[0.38]"}`}>
            Dual?
          </div>
          <Checkbox
            checked={isDual}
            onChange={() => {
              dispatch(
                setGuessOptions({ optionKey: "isDual", value: !isDual })
              );
            }}
            checkedIcon={<img src={IMAGES.dual} alt={"Dual Ink Icon"} />}
            icon={<img src={IMAGES.dual} alt={"Dual Ink Icon"} />}
            disabled={disabled || type === "Location"}
            sx={{
              width: 44,
              height: 44,
              margin: 0,

              "&.Mui-checked": {
                bgcolor: colorIconBackgroundColor.steel,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
