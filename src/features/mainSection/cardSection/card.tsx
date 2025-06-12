import { IMAGES } from "../../../constants";
import { Card } from "../../../types";
import { InkSection } from "./inkSection";
import { CharStatSection } from "./charStatSection/charStatSection";
import { DescriptionSection } from "./descriptionSection/descriptionSection";
import { getShowCard } from "../mainSlice";
import { useSelector } from "react-redux";

type CardContainerProps = {
  selectedCard: Card | undefined;
};

export const CardContainer = (props: CardContainerProps) => {
  const { selectedCard } = props;
  const isLocation = selectedCard!.type === "Location";
  // const isLocation = false;

  const showCard = useSelector(getShowCard);
  return (
    <div
      className={`flex w-[375px] sm:w-[535px] justify-center grow ${
        isLocation ? "mt-10" : "mt-4"
      }`}
    >
      <div className="relative z-5">
        {/* Card Div */}
        <div
          className={`${
            isLocation
              ? "w-[370px] h-[266px] sm:w-[535px] sm:h-[383px]"
              : "w-[266px] h-[370px] sm:w-[383px] sm:h-[535px]"
          }`}
        >
          <img
            src={selectedCard.image}
            // Location
            // src="https://lorcana-api.com/images/hundred_acre_island/pooh's_home/hundred_acre_island-pooh's_home-large.png"
            // Char
            // src="https://lorcana-api.com/images/rhino/motivational_speaker/rhino-motivational_speaker-large.png"
            alt="card"
            className={`${
              isLocation &&
              "rotate-90 translate-x-[20%] translate-y-[-13%] sm:translate-y-[-14%] w-[266px] sm:w-[383px] h-[370px] sm:h-[535px]"
            }`}
          />
          {!showCard && (
            <>
              <img
                src={isLocation ? IMAGES.baseLocation : IMAGES.baseCard}
                alt="base card"
                className="absolute top-0 z-[1]"
              />
              <InkSection isLocation={isLocation} />
              <CharStatSection isLocation={isLocation} />
              <DescriptionSection isLocation={isLocation} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
