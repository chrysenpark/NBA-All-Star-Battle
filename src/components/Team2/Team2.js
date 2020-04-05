import React from "react";
import "./Team2.css";

const Team2 = props => (
  <div className="selected">
    <div className="img-container2">
      <img alt={props.id} src={props.image} />
    </div>
  </div>
);

export default Team2;
