import React from "react";


const GameFormTile = (props) => {
  return(
      <div className = "panel" >
        <a href="/games/new"><i className="fa fa-plus"> </i></a>
        <a href="/games/new"><h5>Add New Game</h5></a>
      </div>
  )
}

export default GameFormTile;
