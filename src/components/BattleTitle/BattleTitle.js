import React from "react";
import "./BattleTitle.css";

const BattleTitle = props => (
  <div className="Battleheader">
    <h1>{props.main}</h1>
  </div>
);

export default BattleTitle;
