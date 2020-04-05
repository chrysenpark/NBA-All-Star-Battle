import React from "react";
import "./Title.css";

const Title = props => (
  <div className="header">
    <h1>{props.main}</h1>
  </div>
);

export default Title;
