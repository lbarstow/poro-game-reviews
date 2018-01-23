import React, { Component } from "react";
import GameTile from "../components/GameTile";

class GamesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  render() {
    return(
      <div>
        <GameTile />
      </div>
    )
  }
}

export default GamesIndexContainer;
