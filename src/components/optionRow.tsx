import { ReactNode } from "react";

type OptionRowProps = {
  label: string;
  children: ReactNode;
};

export const OptionRow = (props: OptionRowProps) => {
  return (
    <div className="flex flex-col items-center md:flex-row my-2">
      <div className="font-bold text-xl mx-auto md:mr-1 md:mx-0 content-center">
        {props.label}:
      </div>

      {props.children}
    </div>
  );
};
