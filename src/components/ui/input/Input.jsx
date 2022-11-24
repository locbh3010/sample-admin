import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

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
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="cursor-pointer inline-block">
        {display}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full outline-none border-slate-400 px-3 py-4 border-b-2 bg-transparent"
        {...field}
        {...props}
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  control: PropTypes.any.isRequired,
};

Input.defaultProps = {
  type: "text",
  defaultValue: "",
};
