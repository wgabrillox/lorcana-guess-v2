import { AutocompleteComponent } from "./components/autocompleteComponent";
import { ColorComponent } from "./components/colorComponent";
import { SwitchComponent } from "./components/switchComponent";
import { SliderComponent } from "./components/sliderComponent";

type Props = {
  showCard: boolean;
  selectedAttributes: { [key: string]: boolean };
  showIncorrect: boolean;
};

export const LeftColumn = (props: Props) => {
  const { showCard, selectedAttributes, showIncorrect } = props;
  return (
    <>
      {/* <AutocompleteComponent
        label="Name"
        id="card-name"
        width={{ xs: 1, sm: 1, md: 312 }}
        showIncorrect={showIncorrect}
        disabled={!selectedAttributes.name || showCard}
      /> */}
      <ColorComponent
        label={"color"}
        disabled={!selectedAttributes.color || showCard}
        showIncorrect={showIncorrect}
      />
      <div className="flex">
        <SwitchComponent
          label="Inkable"
          disabled={!selectedAttributes.inkable || showCard}
          showIncorrect={showIncorrect}
        />
        <div className="flex-1 mx-[10px]">
          <SliderComponent
            label="Cost"
            width={{ xs: 168, sm: 195, md: 195 }}
            disabled={!selectedAttributes.cost || showCard}
            showIncorrect={showIncorrect}
          />
        </div>
      </div>
    </>
  );
};
