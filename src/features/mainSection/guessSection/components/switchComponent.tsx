import Switch from "@mui/material/Switch";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuessValue,
  getIncorrectGuesses,
  setGuessOptions,
} from "../../mainSlice";
import { RootState } from "../../../../app/store";

type SwitchComponentProps = {
  label: string;
  keyLabel?: string;
  disabled: boolean;
  showIncorrect: boolean;
};

export const SwitchComponent = (props: SwitchComponentProps) => {
  const { label, keyLabel, disabled, showIncorrect } = props;
  const dispatch = useDispatch();
  const optionKey = keyLabel ? keyLabel : label.toLowerCase();
  const guessValue = useSelector((state: RootState) =>
    getGuessValue(state, label.toLowerCase())
  );
  const incorrectGuess = useSelector(getIncorrectGuesses)[optionKey];

  return (
    <div className="flex">
      <Box>
        <FormLabel
          sx={{
            color: "text.primary",
            fontWeight: "bold",
          }}
          error={incorrectGuess && showIncorrect}
          disabled={disabled}
        >
          Inkable:
        </FormLabel>
        <Switch
          checked={guessValue}
          onChange={(event: any, newValue: boolean) => {
            dispatch(
              setGuessOptions({
                optionKey: label.toLowerCase(),
                value: newValue,
              })
            );
          }}
          size="small"
          disabled={disabled} //showSelectNew
        />
      </Box>
    </div>
  );
};
