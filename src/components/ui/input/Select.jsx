import React from "react";
import { useController } from "react-hook-form";

const Select = ({ name, control, children, ...props }) => {
  const {} = useController({
    name,
    control,
    defaultValue: "test",
  });
  return (
    <select
      name={name}
      id={name}
      className="py-4 w-full px-4 appearance-none rounded bg-white/80 border border-gray-300 outline-none duration-300 focus:shadow-md font-medium text-slate-800 focus:border-blue-500"
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
