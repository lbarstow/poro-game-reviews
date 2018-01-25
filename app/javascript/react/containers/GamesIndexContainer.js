import React, { Component } from "react";
import GameTile from "../components/GameTile";
import CategoryButton from "../components/CategoryButton";


class GamesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      categories: [],
      category: null
    };
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  handleCategoryClick(event) {
    if (this.state.category === event.target.text) {
      this.setState({ category: null })
    } else {
      let value = event.target.text
      this.setState({ category: value })
    }
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
    fetch('/api/v1/categories.json')
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
        this.setState({ categories: body })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let categoryButtons = this.state.categories.map( category => {

      return(
        <CategoryButton
          name = {category.name}
          handleClick = {this.handleCategoryClick}
        />
      )
    })

    let gameTiles = this.state.games.map( game => {
      let shortDescription = game.description.substring(0, 60).concat('...');
      let categories = ''
      game.categories.forEach(category => {
        categories += `${category.name}, `
      })
      categories = categories.replace(/,\s*$/, "")
      if (categories.includes(this.state.category) || this.state.category ===null) {
        return(
          <li>
          <GameTile
            id={game.id}
            key={game.id}
            name={game.name}
            categories = {categories}
            description={shortDescription}
          />
          </li>
        )
      }
    })
    return(
        <div className = "row games-container">
          <h1 className = "main-title small-8 small-centered columns">Poro Game Reviews</h1>
          <hr/>

          <ul className="button-group even-6 ">
            {categoryButtons}
          </ul>

          <ul className= "small-block-grid-3">
            {gameTiles}
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
