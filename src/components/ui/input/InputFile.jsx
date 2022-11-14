import React from "react";
import PropTypes from "prop-types";

const InputFile = ({ name, display, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className="block font-medium text-gray-900 text-lg capitalize"
      >
        {display}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className="appearance-none file:outline-none bg-gray-50 border border-gray-400 rounded file:border-none file:bg-slate-900 file:px-8 file:py-3 file:text-white file:mr-5 "
        {...props}
      />
      <span className="text-sm text-gray-500 dark:text-gray-300 -mt-1">
        PNG, JPG or WEBP
      </span>
    </div>
  );
};

InputFile.propTypes = {
  name: PropTypes.string.isRequired,
  display: PropTypes.string,
};

export default InputFile;
