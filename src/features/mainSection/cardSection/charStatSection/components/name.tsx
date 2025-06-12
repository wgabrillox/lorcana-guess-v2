import { useSelector } from "react-redux";
import { getName, getType } from "../../../mainSlice";

export const Name = () => {
  const name = useSelector(getName);
  const type = useSelector(getType);
  const isChar = type === "Character";

  const splitName = name.split(" - ");
  return (
    <>
      <div
        className={`absolute w-full text-slate-100 ${
          isChar || splitName.length === 2
            ? "top-[9px] sm:top-[12px]"
            : "top-[16px] sm:top-[23px]"
        }`}
      >
        <div
          className={`flex flex-col ${
            isChar ? "ml-[14px] sm:ml-[20px]" : "items-center"
          }`}
        >
          {name && (
            <>
              <div className="font-bold text-sm sm:text-lg">
                {splitName[0].toUpperCase()}
              </div>
              <div className="font-bold text-xs sm:text-sm">{splitName[1]}</div>
            </>
          )}
        </div>
      </div>
      <div
        className={`absolute w-full ${
          type === "Location"
            ? "bottom-[0px] sm:bottom-[2px]"
            : "bottom-[0px] sm:bottom-[2px]"
        }`}
      >
        <div className="flex justify-center text-white opacity-[0.6]">
          {type}
        </div>
      </div>
    </>
  );
};
