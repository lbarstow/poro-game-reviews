import React from "react";
import { Link } from 'react-router';

const GameTile = (props) => {

  return(
    <div className = 'panel'>
        <h4 className="game-name small-12 small-centered columns">{props.name}</h4>
        <hr/>
        <h6 className = "categories">{props.categories}</h6>
        <hr/>
        <p>{props.description}</p>
        <Link to={"games/"+props.id} className="button view-game small-12 small-centered columns">View Game</Link>
    </div>
  )
}

export default GameTile;
