import React from "react";
import { Link } from 'react-router';

const GameFormTile = (props) => {
  return(
      <div className = "panel index-tile" >
      <br/>
      <Link to="/games/new"><i className="fa fa-plus small-12 small-centered columns"> </i></Link>
      <br/>
      <hr/>
        <Link to="/games/new"><h5 className="button new-game small-12 small-centered columns">Add New Game</h5></Link>
      </div>
  )
}

export default GameFormTile;
