import React from "react";

export default function Input({
  type = "text",
  display,
  placeholder,
  name,
  props,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-xl capitalize">
        {display}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent px-3 py-4 bg-gray-300 border border-gray-400 rounded duration-300 focus:bg-transparent focus:shadow"
        {...props}
      />
    </div>
  );
}
