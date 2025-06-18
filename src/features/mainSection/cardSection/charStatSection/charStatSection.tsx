import { Color } from "./components/color";
import { Stats } from "./components/stats";
import { Name } from "./components/name";

type Props = {
  isLocation: boolean;
};

export const CharStatSection = (props: Props) => {
  const { isLocation } = props;

  return (
    <div
      className={`absolute z-4 ${
        isLocation
          ? "top-[117px] sm:top-[162px] w-full"
          : "top-[182px] sm:top-[267px]"
      }`}
    >
      <div className="relative">
        <Color isLocation={isLocation} />
        <Stats />
        <Name />
      </div>
    </div>
  );
};
