import React from "react";
//import { Link } from "react-router"
const GameTile = (props) => {
  return(
    // <Link path=`/games/${props.id}`>
      <div className = "panel small-3 columns" >
        <h5>{props.name}</h5>
        <h6>Category</h6>
        <p>{props.description}</p>
      </div>
    //</Link>
  )
}

export default GameTile;
