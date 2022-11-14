import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ type = "button", variant, children, props }) => {
  return (
    <button
      type={type}
      className={
        variant === "update"
          ? "btn-update"
          : variant === "remove" && "btn-remove"
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
