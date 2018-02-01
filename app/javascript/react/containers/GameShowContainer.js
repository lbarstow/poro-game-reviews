import React, { Component } from "react";
import GameShowTile from '../components/GameShowTile';
import ReviewTile from '../components/ReviewTile';
import { Link } from 'react-router'

class GameShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      categories: [],
      min_players: null,
      max_players: null,
      reviews: []
    }
  }
  componentDidMount() {
    fetch(`/api/v1/${this.props.location.pathname}`)
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
      this.setState({
        name: body.game.name,
        description: body.game.description,
        categories: body.game.categories,
        min_players: body.game.min_player_count,
        max_players: body.game.max_player_count,
        reviews: body.reviews,
        average_rating: body.average_rating
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let categories = ''
    this.state.categories.forEach(category => {
      categories += `${category.name}, `
    })
    categories = categories.replace(/,\s*$/, "")
    let reviews = this.state.reviews.map( review => {
      return(
        <ReviewTile
          key={review.id}
          rating={review.rating}
          body={review.body}
          victory_points={review.victory_points}
          username={review.username}
        />
      )
    })
    return(
      <div>
        <div className= "row">
          <GameShowTile
            name={this.state.name}
            description={this.state.description}
            categories={categories}
            min_players={this.state.min_players}
            max_players={this.state.max_players}
            average_rating={this.state.average_rating}
          />
        </div>
        <div className= "row">
          <Link to={this.props.location.pathname+"/reviews/new"} className = "button small-3 small-offset-1 columns">Add new review</Link>
          <Link to="/games" className = "button small-3 small-offset-3 columns end">Back to all games</Link>
        </div>
        <div className= "row">
          {reviews}
        </div>
      </div>
    )
  }
}

export default GameShowContainer;
