import React from "react";

const GameTile = (props) => {

  return(
    <div className = 'panel'>
        <h4 className="game-name small-12 small-centered columns">{props.name}</h4>
        <hr/>
        <h6 className = "categories">{props.categories}</h6>
        <hr/>
        <p>{props.description}</p>
        <a href='#' className="button view-game small-12 small-centered columns"> View Game </a>
    </div>
  )
}

export default GameTile;
