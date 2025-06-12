import { SetFilter } from "./setFilter";
import { ColorFilter } from "./colorFilter";
import { TypeFilter } from "./typeFilter";
import { SelectAllButtons } from "./selectAllButtons";

export const Filters = () => {
  return (
    <div className="lg:w-fit border mx-[1%] lg:mx-auto my-2 lg:p-3 rounded-md">
      <div className="flex flex-col justify-center">
        <div className="w-fit mx-auto">
          <SetFilter />
          <ColorFilter />
          <TypeFilter />
        </div>
      </div>
      <div className="flex justify-center mb-2">
        <SelectAllButtons />
      </div>
    </div>
  );
};
