import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getGuessValue, getIncorrectGuesses } from "../../mainSlice";
import { RootState } from "../../../../app/store";
import { setGuessOptions } from "../../mainSlice";

type Props = {
  label: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  keyLabel?: string;
  labelWidth?: string;
  width?: number | { [key: string]: number };
  showIncorrect: boolean;
};

interface ThumbProps extends React.HTMLAttributes<unknown> {}

const CustomSlider = styled(Slider)({
  color: "#34373c",
  padding: "13px 0 !important",
  marginRight: "15px",
  "& .MuiSlider-thumb": {
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    outline: "2px solid #f0b100",
    "&::before": {
      display: "none",
    },
  },
});

export const SliderComponent = (props: Props) => {
  const { label, min, max, disabled, keyLabel, labelWidth, showIncorrect } =
    props;

  const optionKey = keyLabel ? keyLabel : label.toLowerCase();
  const dispatch = useDispatch();
  const minValue = min !== undefined ? min : 1;
  let guessValue = useSelector((state: RootState) =>
    getGuessValue(state, optionKey)
  );
  const incorrectGuesses = useSelector(getIncorrectGuesses);

  function ThumbComponent(props: ThumbProps) {
    const { children, className = "", ...other } = props;
    return (
      <SliderThumb className={`rounded-full ${className} `} {...other}>
        <span
          className={`w-5 h-5 bg-black 
            ${disabled ? "text-gray-500" : "text-white"}
            rounded-full ring-1 ring-inset ring-slate-900/5 text-center text-sm`}
        >
          {guessValue}
        </span>
        {children}
      </SliderThumb>
    );
  }

  const markMax = max ? max - 1 : 9;
  const marks = Array.from({ length: markMax - 1 }, (_, i) => ({
    value: i + 1 + 1,
    label: "",
  }));

  return (
    <Box className="flex">
      <FormLabel
        disabled={disabled}
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          mr: "15px",
          width: {
            // sm: "default",
            sm: `${labelWidth ? labelWidth : "default"}`,
          },
          alignContent: "center",
        }}
        error={incorrectGuesses[optionKey] && showIncorrect}
      >
        {label}:
      </FormLabel>
      <CustomSlider
        disabled={disabled}
        value={guessValue === undefined ? 0 : guessValue}
        min={minValue}
        max={max ? max : 10}
        marks={marks.length ? marks : [{ value: 1, label: "" }]}
        onChange={(event: Event, newValue: number) => {
          dispatch(
            setGuessOptions({
              optionKey,
              value: newValue,
            })
          );
        }}
        slots={{
          thumb: ThumbComponent,
        }}
      />
    </Box>
  );
};
