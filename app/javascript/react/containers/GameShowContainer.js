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
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this)
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this)
  }
  handleUpVoteClick(event){
    console.log(event.target)

  }
  handleDownVoteClick(event){
    debugger
    console.log("down")

  }
  componentDidMount() {
    fetch(`/api/v1/${this.props.location.pathname}?user_id=${this.props.currentUserId}`)
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
        reviews: body.reviews
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

      let upClass = 'fa fa-thumbs-up';
      let downClass = 'fa fa-thumbs-down';
      let voteValue = 0;
      if (review.user_vote != null){
        voteValue = review.user_vote.value;
        if(review.user_vote.value == 1){
          upClass = upClass + ' upvoted';
        }else if (review.user_vote.value == -1){
          downClass = downClass + ' downvoted';
        }
      }

      return(
        <ReviewTile
          key={review.id}
          rating={review.rating}
          body={review.body}
          victory_points={review.victory_points}
          username={review.username}
          value={voteValue}
          downClass = {downClass}
          upClass = {upClass}
          onUpVote = {this.handleUpVoteClick}
          onDownVote = {this.handleDownVoteClick}

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
