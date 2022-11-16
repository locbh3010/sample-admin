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
      <label htmlFor={name} className="font-semibold text-xl capitalize">
        {display}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full outline-none bg-transparent px-3 py-4 border-2 border-gray-400/30 rounded duration-300 focus:bg-transparent shadow-sm focus:shadow-lg focus:border-blue-500/40"
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
