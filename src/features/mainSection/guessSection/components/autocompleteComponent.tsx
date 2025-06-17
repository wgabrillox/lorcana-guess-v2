import { Option, CardOptions, Card } from "../../../../types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  setGuessOptions,
  getCardOptions,
  getGuessValue,
  getIncorrectGuesses,
} from "../../mainSlice";
import { RootState } from "../../../../app/store";

type Props = {
  label: string;
  id: string;
  keyLabel?: string;
  width?: number | { [key: string]: number };
  disabled?: boolean;
  disableOption?: boolean;
  showIncorrect: boolean;
  styles?: string;
};

export const AutocompleteComponent = (props: Props) => {
  const {
    label,
    id,
    keyLabel,
    width,
    disabled,
    disableOption,
    showIncorrect,
    styles,
  } = props;

  const dispatch = useDispatch();
  const optionKey = keyLabel ? keyLabel : label.toLowerCase();
  const cardOptions = useSelector(getCardOptions);
  let guessValue = useSelector((state: RootState) =>
    getGuessValue(state, optionKey)
  );
  const incorrectGuess = useSelector(getIncorrectGuesses)[optionKey];

  // const [autofill, setAutofill] = useState<boolean>(!isAttributeSelected);
  // console.log("option key", optionKey);
  // console.log("autofill", autofill);
  // if (autofill) {
  //   dispatch(setGuessOptions({ optionKey, value: trueValue }));
  //   setAutofill(false);
  // }

  const sxProp = width
    ? {
        width: width,
      }
    : {};

  // Remove duplicate values (mainly for body text/description)
  let uniqueValues: Option[] = [];
  const cardOptionsList: Option[] = cardOptions[optionKey];
  cardOptionsList.reduce<{ [key: string]: Option }>((acc, curr) => {
    if (acc[curr.value.trim()]) {
      return acc;
    } else {
      uniqueValues = [
        ...uniqueValues,
        { value: curr.value.trim(), label: curr.label.trim() },
      ];
      return {
        ...acc,
        [curr.value.trim()]: curr,
      };
    }
  }, {});

  // Sort options alphabetically
  const options = uniqueValues.sort((a, b) => {
    const valueA = a.value.toUpperCase();
    const valueB = b.value.toUpperCase();

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }

    return 0;
  });

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={options}
      getOptionDisabled={(option) =>
        disableOption!! && option.value === "Location"
      }
      disabled={disabled}
      value={guessValue ? { label: guessValue, value: guessValue } : null}
      sx={sxProp}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={incorrectGuess && showIncorrect}
        />
      )}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(event: any, newValue: Option | null) => {
        dispatch(
          setGuessOptions({ optionKey, value: newValue ? newValue.value : "" })
        );
        event.target.blur();
      }}
      className={`mb-2 ${styles}`}
    />
  );
};
