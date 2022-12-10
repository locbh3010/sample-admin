import React from "react";
import { useController } from "react-hook-form";

const Select = ({ name, control, children, ...props }) => {
  const {} = useController({
    name,
    control,
  });
  return (
    <select
      name={name}
      id={name}
      className="select font-medium select-bordered"
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
