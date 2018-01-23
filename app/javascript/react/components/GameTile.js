import React from "react";

const GameTile = (props) => {
  return(
    <div>
      <h5>{props.name}</h5>
      <h6>Category</h6>
      <p>{props.description}</p>
    </div>
  )
}

export default GameTile;
