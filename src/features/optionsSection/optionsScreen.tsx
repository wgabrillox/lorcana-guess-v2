import { Filters } from "./filterSection/filters";
import { Attributes } from "./attributeSection/attributes";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { getFilters } from "./optionsSlice";
import { DisclaimerDialog } from "./dialog";

type OptionsProps = {
  setShowGame: () => void;
};

export const OptionsScreen = (props: OptionsProps) => {
  const { set, color, type } = useSelector(getFilters);
  const selectedSets = Object.keys(set).filter(
    (setKey) => set[setKey].selected
  );
  const selectedColors = Object.keys(color).filter(
    (colorKey) => color[colorKey].selected
  );
  const selectedTypes = Object.keys(type).filter(
    (typeKey) => type[typeKey].selected
  );

  const showAlert =
    !selectedSets.length || !selectedColors.length || !selectedTypes.length;

  return (
    <div className="h-screen content-center mx-auto">
      <div className="flex flex-col font-bold text-4xl items-center">
        <div className="text-2xl">Disney Lorcana</div>
        <div className="text-lg">Guess the Card</div>
      </div>
      <Filters />
      <Attributes />
      {showAlert && (
        <Alert severity="error" className="mt-2">
          No cards found, select more filters
        </Alert>
      )}
      <div className="flex justify-center mb-2">
        <Button
          variant="outlined"
          onClick={() => props.setShowGame()}
          disabled={showAlert}
        >
          Begin!
        </Button>
      </div>

      <div className="fixed left-0 bottom-0 z-2 bg-white">
        <DisclaimerDialog />
      </div>
    </div>
  );
};
