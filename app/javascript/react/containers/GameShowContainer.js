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
      reviews: [],
      errors: []
    }
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this)
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this)
    this.handleNoUserAddReviewClick = this.handleNoUserAddReviewClick.bind(this)
  }

  handleNoUserAddReviewClick() {
    let errors = []
    errors.push("Please Sign In to Enter New Review")
    this.setState({ errors: errors })
  }

  handleUpVoteClick(review_id, val){
    let errors = []
    errors.push("Please Sign In to Vote")
    this.setState({ errors: errors })

    if(this.props.currentUserId != null) {
      if(val == 1) {
        fetch(`/api/v1/${this.props.location.pathname}?user_id=${this.props.currentUserId}&review_id=${review_id}&val=${-1}&update=destroy`)
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
      } else if (val == 0) {
        fetch(`/api/v1/${this.props.location.pathname}?user_id=${this.props.currentUserId}&review_id=${review_id}&val=${1}&update=create`)
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
      } else {
        fetch(`/api/v1/${this.props.location.pathname}?user_id=${this.props.currentUserId}&review_id=${review_id}&val=${1}&update=update`)
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
      }
    }
  }
  handleDownVoteClick(review_id, val){
    let errors = []
    errors.push("Please Sign In to Vote")
    this.setState({ errors: errors })

    if(this.props.currentUserId != null) {
      if(val == 1) {
        fetch(`/api/v1/${this.props.location.pathname}?user_id=${this.props.currentUserId}&review_id=${review_id}&val=${-1}&update=update`)
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
      } else if (val == 0) {
        fetch(`/api/v1/${this.props.location.pathname}?user_id=${this.props.currentUserId}&review_id=${review_id}&val=${-1}&update=create`)
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
      } else {
        fetch(`/api/v1/${this.props.location.pathname}?user_id=${this.props.currentUserId}&review_id=${review_id}&val=${1}&update=destroy`)
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
      }
    }
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
        reviews: body.reviews,
        average_rating: body.average_rating
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let errorHTML
    let errorClass = ""
    if (this.state.errors.length > 0) {
      errorClass = "panel alert"
      errorHTML = this.state.errors.map(error => {
        return <li>{error}</li>
      })
    }

    let newReviewButton
    if (this.props.currentUserId) {
      newReviewButton = <Link to={this.props.location.pathname+"/reviews/new"} className = "button small-3 small-offset-1 columns form-button">Add new review</Link>
    } else {
      newReviewButton = <Link to={this.props.location.pathname} className = "button small-3 small-offset-1 columns form-button" onClick={this.handleNoUserAddReviewClick}>Add new review</Link>
    }

    let categories = ''
    this.state.categories.forEach(category => {
      categories += `${category.name}, `
    })
    categories = categories.replace(/,\s*$/, "")
    let reviews = this.state.reviews.map( review => {

      let upClass = 'fa fa-thumbs-up';
      let downClass = 'fa fa-thumbs-down';
      let voteValue = 0;
      let voteColorClass = 'vp';
      if (review.user_vote != null){
        voteValue = review.user_vote.value;
        if(review.user_vote.value == 1){
          upClass = upClass + ' upvoted';
          voteColorClass = voteColorClass + ' upvoted'
        }else if (review.user_vote.value == -1){
          downClass = downClass + ' downvoted';
          voteColorClass = voteColorClass + ' downvoted'
        }
      }

      return(
        <ReviewTile
          id = {review.id}
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
          voteColorClass = {voteColorClass}

        />
      )
    })
    return(
      <div>
        <div className= "row">
          <div className= {errorClass}>
            {errorHTML}
          </div>
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
          {newReviewButton}
          <Link to="/games" className = "button small-3 small-offset-3 columns end form-button">Back to all games</Link>
        </div>
        <div className= "row">
          {reviews}
        </div>
      </div>
    )
  }
}

export default GameShowContainer;
