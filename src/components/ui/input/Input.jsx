import React from "react";
import { useController } from "react-hook-form";

export default function Input({
  type,
  display,
  name,
  control,
  defaultValue,
  item,
  ...props
}) {
  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        {display}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="input w-full input-bordered"
        {...field}
        {...props}
      />
    </div>
  );
}
