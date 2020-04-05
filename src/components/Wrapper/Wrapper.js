import React from "react";
import "./Wrapper.css";

const Wrapper = props => (
  <div className="wrapper">
    <h1>{props.main}</h1>
    {props.children}
  </div>
);

export default Wrapper;
