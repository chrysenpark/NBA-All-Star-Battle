import React from "react";
import "./Buttons.css";

const Styles = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--play--solid",
  "btn--team--solid",
  "btn--rank--solid",
];

const Sizes = ["btn--small", "btn--medium"];

const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const checkButtonStyle = Styles.includes(buttonStyle)
    ? buttonStyle
    : Styles[0];
  const checkButtonSize = Sizes.includes(buttonSize) ? buttonSize : Sizes[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
