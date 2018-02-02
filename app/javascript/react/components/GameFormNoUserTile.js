import React from "react";
import { Link } from 'react-router';

const GameFormNoUserTile = (props) => {
  return(
      <div className = "panel index-tile" >
      <br/>
        <Link to="/games" onClick={props.handleClick}><i className="fa fa-plus small-12 small-centered columns"> </i></Link>
      <br/>
      <hr/>
        <Link to="/games" onClick={props.handleClick}><h5 className="button new-game small-12 small-centered columns">Sign In To Add New Game</h5></Link>
      </div>
  )
}

export default GameFormNoUserTile;
