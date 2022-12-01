import { number } from "prop-types";
import React, { useEffect, useState } from "react";
import { dropdownStore } from "../../../hooks/useDrodown";

export const DropdownItem = ({ value, children }) => {
  const { handleClickDropdownItem, currentValue } = dropdownStore(
    (state) => state
  );
  return (
    <span
      className={`px-3 py-4 block duration-300 hover:bg-gray-100 capitalize ${
        currentValue === value ? "bg-gray-100" : "bg-transparent"
      }`}
      onClick={handleClickDropdownItem}
      data-value={value}
    >
      {children}
    </span>
  );
};
const Dropdown = ({ filter, setFilter, type, defaultValue, children }) => {
  const {
    isOpen,
    handleToggleDropdown,
    currentValue,
    handleSetValue,
    text,
    handleSetText,
  } = dropdownStore((state) => state);

  useEffect(() => {
    const handleClickOutSideDropdown = (e) => {};
    handleSetValue(defaultValue);
    children?.length > 0 &&
      children.map((child) => {
        if (child.props?.value === defaultValue)
          handleSetText(child.props.children);
      });

    window.addEventListener("click", handleClickOutSideDropdown);

    return () => {
      window.removeEventListener("click", handleClickOutSideDropdown);
    };
  }, []);
  useEffect(() => {
    if (!filter) setFilter(currentValue);
    else {
      if (typeof currentValue === number)
        setFilter({ ...filter, [type]: +currentValue });
      else setFilter({ ...filter, [type]: currentValue });
    }
  }, [currentValue]);
  return (
    <div
      className="w-full bg-white rounded-lg text-slate-900 relative cursor-pointer font-semibold z-40 select-none"
      data-value={currentValue}
      data-type={type}
    >
      <div
        className="w-full h-full px-3 py-4 rounded-lg capitalize"
        onClick={handleToggleDropdown}
      >
        <span>{text}</span>
      </div>
      <div
        className={`absolute top-full w-full left-0 translate-y-2 bg-white duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
