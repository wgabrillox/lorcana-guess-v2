import { AutocompleteComponent } from "./components/autocompleteComponent";
import { SliderComponent } from "./components/sliderComponent";
import { useSelector } from "react-redux";
import { getType } from "../mainSlice";

type Props = {
  showCard: boolean;
  selectedAttributes: { [key: string]: boolean };
  showIncorrect: boolean;
};

export const RightColumn = (props: Props) => {
  const { showCard, selectedAttributes, showIncorrect } = props;
  const type = useSelector(getType);
  const isCharSelected = type === "Character";
  const isLocSelected = type === "Location";

  return (
    <div className="flex flex-row sm:flex-col">
      <div className="grow mr-2 sm:mr-0">
        <SliderComponent
          label="Strength"
          disabled={!isCharSelected || !selectedAttributes.strength || showCard}
          showIncorrect={showIncorrect}
          min={0}
        />
        <SliderComponent
          label="Willpower"
          disabled={
            showCard ||
            !selectedAttributes.willpower ||
            (selectedAttributes.willpower && !isCharSelected && !isLocSelected)
          }
          showIncorrect={showIncorrect}
        />
      </div>
      <div className="grow">
        <SliderComponent
          label="Lore"
          max={isLocSelected ? 2 : 5}
          min={0}
          disabled={
            showCard ||
            !selectedAttributes.lore ||
            (selectedAttributes.lore && !isCharSelected && !isLocSelected)
          }
          showIncorrect={showIncorrect}
        />
        <SliderComponent
          label={`Move Cost`}
          keyLabel="moveCost"
          max={3}
          min={0}
          disabled={!isLocSelected || !selectedAttributes.moveCost || showCard}
          labelWidth={"185px"}
          showIncorrect={showIncorrect}
        />
      </div>
    </div>
  );
};
