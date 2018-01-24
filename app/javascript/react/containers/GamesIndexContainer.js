import React, { Component } from "react";
import GameTile from "../components/GameTile";
import GameFormTile from "../components/GameFormTile";

class GamesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    fetch('/api/v1/games.json')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ games: body })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let gameTiles = this.state.games.map( game => {
      let shortDescription = game.description.substring(0, 60).concat('...');
      return(
        <GameTile
          id={game.id}
          key={game.id}
          name={game.name}
          description={shortDescription}
        />
      )
    })
    return(
      <div className = "row">
        {gameTiles}
        <GameFormTile/>
      </div>
    )
  }
}

export default GamesIndexContainer;
