import React from "react";

const GameTile = (props) => {
  return(
      <div className = "panel small-3 columns" >
        <h5>{props.name}</h5>
        <h6>Category</h6>
        <p>{props.description}</p>
      </div>
  )
}

export default GameTile;
