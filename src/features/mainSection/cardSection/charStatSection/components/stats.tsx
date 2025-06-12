import { useSelector } from "react-redux";
import {
  getType,
  getStrength,
  getWillpower,
  getMoveCost,
} from "../../../mainSlice";
import "../charStatSection.css";

export const Stats = () => {
  const type = useSelector(getType);
  const strength = useSelector(getStrength);
  const willpower = useSelector(getWillpower);
  const moveCost = useSelector(getMoveCost);
  const isLocation = type === "Location";
  const isChar = type === "Character";

  return (
    // <div className="absolute charStats font-bold">

    (isLocation || isChar) && (
      <>
        <div
          className={`absolute right-[10px] sm:right-[17px] z-4 text-xl sm:text-2xl ${
            isLocation ? "top-[3px]" : "top-[4px] sm:top-[8px] "
          }`}
        >
          {!isLocation && (
            <div className="stat w-[30px] top-[11px] right-[44px] sm:right-[54px]">
              {strength}
            </div>
          )}
          <div
            className={`stat w-[30px] text-white ${
              isLocation
                ? "right-[6px] sm:right-[13px] top-[10px] sm:top-[17px] "
                : "right-[10px] top-[11px]"
            }`}
          >
            {willpower}
          </div>
          {}
        </div>
        {isLocation && (
          <div className="stat w-[34px] text-2xl top-[9px] sm:top-[18px] left-[18px] sm:left-[33px] text-white">
            {moveCost}
          </div>
        )}
      </>
    )
  );
};
