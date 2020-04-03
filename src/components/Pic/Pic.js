import React from "react";
import "./Pic.css";

const Pic = props => (
  <div className="card">
    <div className="img-container">
      <img
        alt={props.id}
        src={props.image}
        onClick={() => {
          props.score(props.id);
        }}
      />
    </div>
  </div>
);

export default Pic;
