import React from "react";
import { Link } from 'react-router';

const GameFormTile = (props) => {
  return(
      <div className = "panel small-3 columns" >
      <Link to="/games/new"><i className="fa fa-plus"> </i></Link>
        <Link to="/games/new"><h5>Add New Game</h5></Link>
      </div>
  )
}

export default GameFormTile;
