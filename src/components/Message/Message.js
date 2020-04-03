import React from "react";
import "./Message.css";

const Main = props => (
  <div className={`message ${props.result}`}>
    <h1>{props.main}</h1>
    <h3>{props.sub}</h3>
    {props.message}
  </div>
);

export default Main;
