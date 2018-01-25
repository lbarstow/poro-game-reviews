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
        <li>
        <GameTile
          id={game.id}
          key={game.id}
          name={game.name}
          description={shortDescription}
        />
        </li>
      )
    })
    return(
        <div className = "row games-container">
          <h1 className = "main-title small-8 small-centered columns">Poro Game Reviews</h1>
          <hr/>

          <ul className="button-group even-6 ">
            <li><a href="#" className="button tiny">Category 1</a></li>
            <li><a href="#" className="button tiny">Category 2</a></li>
            <li><a href="#" className="button tiny">Category 3</a></li>
            <li><a href="#" className="button tiny">Category 4</a></li>
            <li><a href="#" className="button tiny">Category 5</a></li>
            <li><a href="#" className="button tiny">Category 6</a></li>
            <li><a href="#" className="button tiny">Category 7</a></li>
            <li><a href="#" className="button tiny">Category 8</a></li>
            <li><a href="#" className="button tiny">Category 9</a></li>
            <li><a href="#" className="button tiny">Category 10</a></li>
            <li><a href="#" className="button tiny">Category 11</a></li>
            <li><a href="#" className="button tiny">Category 12</a></li>
          </ul>

          <ul className= "small-block-grid-3">
            {gameTiles}
            <li> <GameFormTile/> </li>
          </ul>
          <div className = "pagination-centered">
            <ul className="pagination">
            <li className="arrow unavailable"><a href="">&laquo;</a></li>
            <li className="current"><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
            <li><a href="">4</a></li>
            <li className="unavailable"><a href="">&hellip;</a></li>
            <li><a href="">12</a></li>
            <li><a href="">13</a></li>
            <li className="arrow"><a href="">&raquo;</a></li>
            </ul>
          </div>

        </div>
    )
  }
}

export default GamesIndexContainer;
