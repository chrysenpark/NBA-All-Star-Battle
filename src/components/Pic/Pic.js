import React from "react";
import "./Pic.css";

const Pic = (props) => (
  <div className="card">
    <div className="img-container">
      <img
        alt={props.id}
        src={props.image}
        onClick={() => {
          props.budget(props.id);
        }}
      />
      <h6>{props.Cost}</h6>
      <h6>{props.PPG}</h6>
      <h6>{props.RPG}</h6>
      <h6>{props.APG}</h6>
      <h6>{props.SPG}</h6>
      <h6>{props.BPG}</h6>
    </div>
  </div>
);

export default Pic;
