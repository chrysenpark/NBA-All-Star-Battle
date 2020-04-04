import React from "react";
import "./Team.css";

const Team = props => (
  <div className="selected">
    <div className="img-container">
      <img alt={props.id} src={props.image} />
    </div>
  </div>
);

export default Team;
