import React from "react";
import "./SubHeading.css";

const SubHeading = props => (
  <div className={`heading ${props.result}`}>
    <h3>{props.main}</h3>
    <h5>{props.sub}</h5>
    {props.message}
  </div>
);

export default SubHeading;
