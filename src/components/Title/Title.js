import React from "react";
import "./Title.css";

const Title = props => (
  <div className="header">
    <h1>{props.main}</h1>
    <h3>{props.sub}</h3>
    <h4>{props.score}</h4>
  </div>
);

export default Title;
