import { IMAGES } from "../../../../constants";
import { useSelector } from "react-redux";
import { getBodyText, getLore } from "../../mainSlice";
type Props = {
  isLocation: boolean;
};

export const DescriptionSection = (props: Props) => {
  const { isLocation } = props;
  const bodyText = useSelector(getBodyText);
  const lore = useSelector(getLore);
  const loreCount = lore
    ? isLocation
      ? `locationLore${lore}`
      : `lore${lore}`
    : "";

  return (
    <div
      className={`absolute z-1 ${
        isLocation
          ? "top-[180px] sm:top-[246px]"
          : "top-[243px] sm:top-[347px] left-[10px] sm:left-[15px]"
      }`}
    >
      <div
        className={`relative ${
          isLocation ? "w-[370px]" : "w-[245px]"
        } sm:w-auto`}
      >
        <img
          src={isLocation ? IMAGES.locationDescription : IMAGES.descriptionBase}
        />
        <img
          className={`absolute z-[2] top-[1px] ${
            isLocation
              ? "right-[12px] sm:right-[17px] w-[33px] sm:w-auto"
              : "h-[98px] sm:h-auto right-0"
          }`}
          src={IMAGES[loreCount]}
        />
        <div
          className={`absolute text-[11px] sm:text-sm top-0 ${
            isLocation ? "ml-[17px] mr-[63px]" : "ml-[3px] mr-[30px]"
          }`}
        >
          {bodyText}
        </div>
      </div>
    </div>
  );
};
