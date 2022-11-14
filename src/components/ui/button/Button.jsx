import React from "react";
import PropTypes from "prop-types";

const Button = ({
  type = "button",
  variant = "update",
  children,
  ...props
}) => {
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

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  variant: PropTypes.oneOf(["update", "remove"]).isRequired,
};

export default Button;
