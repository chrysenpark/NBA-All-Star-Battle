import React from "react";
import "./IndentHeading.css";

const IndentHeading = props => (
  <div className={`IndentHeading ${props.result}`}>
    <h3>{props.main}</h3>
    <h5>{props.sub}</h5>
    {props.message}
  </div>
);

export default IndentHeading;
