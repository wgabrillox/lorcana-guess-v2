import { IMAGES } from "../../../constants";
import { useSelector } from "react-redux";
import { getInkable, getCost } from "../mainSlice";

type Props = {
  isLocation: boolean;
};

export const InkSection = (props: Props) => {
  const { isLocation } = props;
  const isInkable = useSelector(getInkable);
  const cost = useSelector(getCost);

  return (
    <div
      className={`absolute z-1 ${
        isLocation
          ? "w-[48px] sm:w-auto top-[11px] right-[7px]"
          : "w-[48px] sm:w-auto top-[9px] left-[4px] sm:top-[12px] sm:left-[7px]"
      }`}
    >
      <div
        className={`relative flex justify-center items-center ${
          isLocation && "rotate-90"
        }`}
      >
        {/* <img src={IMAGES.baseInkCost} /> used for when cost is not selected*/}
        <div className="top-0">
          <img src={isLocation ? IMAGES.baseInkEmpty : IMAGES.baseInkEmpty} />
        </div>
        <div className={`absolute z-[2] ${!isInkable && "ml-[3px] mt-[1px]"}`}>
          {/* Update this to be in src */}
          {isInkable ? (
            <img src={IMAGES.baseInkable} />
          ) : (
            <img src={IMAGES.baseNonInkable} />
          )}
        </div>
        <div
          className={`absolute z-[3] text-white text-xl sm:text-2xl mr-[2px] mb-[2px] ${
            isLocation && "-rotate-90"
          }`}
        >
          {cost}
        </div>
      </div>
    </div>
  );
};
