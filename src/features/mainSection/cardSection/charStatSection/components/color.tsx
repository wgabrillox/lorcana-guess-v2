import { IMAGES } from "../../../../../constants";
import { useSelector } from "react-redux";
import { getColor, getType } from "../../../mainSlice";

type ColorProps = {
  isLocation: boolean;
};

export const Color = (props: ColorProps) => {
  const { isLocation } = props;
  const color = useSelector(getColor);
  const type = useSelector(getType);

  const sortedColors = [...color].sort();
  const mainColor = sortedColors[0];
  const subColor = sortedColors.length === 2 ? sortedColors[1] : "";

  let colorBanner,
    subColorBanner,
    colorCharStats = "";

  // colorBanner = isLocation ? IMAGES.amberLocation : IMAGES.amberBanner;

  switch (mainColor) {
    case "amber":
      colorBanner = isLocation ? IMAGES.amberLocation : IMAGES.amberBanner;
      colorCharStats = IMAGES.amberCharStats;
      break;
    case "amethyst":
      colorBanner = isLocation
        ? IMAGES.amethystLocation
        : IMAGES.amethystBanner;
      colorCharStats = IMAGES.amethystCharStats;
      break;
    case "emerald":
      colorBanner = isLocation ? IMAGES.emeraldLocation : IMAGES.emeraldBanner;
      colorCharStats = IMAGES.emeraldCharStats;
      break;
    case "ruby":
      colorBanner = isLocation ? IMAGES.rubyLocation : IMAGES.rubyBanner;
      colorCharStats = IMAGES.rubyCharStats;
      break;
    case "sapphire":
      colorBanner = isLocation
        ? IMAGES.sapphireLocation
        : IMAGES.sapphireBanner;
      colorCharStats = IMAGES.sapphireCharStats;
      break;
    case "steel":
      colorBanner = isLocation ? IMAGES.steelLocation : IMAGES.steelBanner;
      colorCharStats = IMAGES.steelCharStats;
      break;
    default:
      break;
  }

  switch (subColor) {
    case "amethyst":
      subColorBanner = IMAGES.amethystDual;
      colorCharStats = IMAGES.amethystCharStats;
      break;
    case "emerald":
      subColorBanner = IMAGES.emeraldDual;
      colorCharStats = IMAGES.emeraldCharStats;
      break;
    case "ruby":
      subColorBanner = IMAGES.rubyDual;
      colorCharStats = IMAGES.rubyCharStats;
      break;
    case "sapphire":
      subColorBanner = IMAGES.sapphireDual;
      colorCharStats = IMAGES.sapphireCharStats;
      break;
    case "steel":
      subColorBanner = IMAGES.steelDual;
      colorCharStats = IMAGES.steelCharStats;
      break;
    default:
      break;
  }

  return (
    <>
      {colorBanner && (
        <>
          <img
            className={`h-[66px] ${
              isLocation ? "sm:h-[88px]" : "sm:h-[86px]"
            } w-full`}
            src={colorBanner}
            alt="base banner"
          />
          {subColor && (
            <div className="absolute z-0 top-0 right-[10px] sm:right-[15px]">
              <img
                className="h-[62px] sm:h-[80px]"
                src={subColorBanner}
                alt="sub color banner"
              />
            </div>
          )}
          {type === "Character" && (
            <div className="absolute top-[6px] right-[17px] z-4 w-[75px] sm:w-auto">
              <img src={colorCharStats} alt="char stats" />
            </div>
          )}
        </>
      )}
    </>
  );
};
