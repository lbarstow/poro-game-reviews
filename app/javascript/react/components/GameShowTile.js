import React from 'react'

const GameShowTile = (props) => {
  return (
    <div className = "panel">
    <h1>{props.name}</h1>
    <hr/>
    <h3> Category: {props.categories} </h3>
    <h3> Players: {props.min_players} to {props.max_players} players </h3>
    <br/>
    <p> {props.description} </p>
    </div>
  )
}

export default GameShowTile
