import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

class ReviewFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      rating: '',
      body: "",
      errors: []
    };
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }
  handleRatingChange(event) {
    this.setState({ rating: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    let formPayload = {
      rating: this.state.rating,
      body: this.state.body,
      user_id: this.props.currentUserId,
    };
    let errors = []
    if (formPayload.user_id == null) {
      errors.push("Please sign in")
    }
    if (formPayload.rating == null || formPayload.rating == '') {
      errors.push("Rating is Required")
    }else if (formPayload.rating == null || formPayload.rating == '') {
      errors.push("Rating is Required")
    }
    if (errors.length === 0) {
      //add correct route when i figure out how to get it
      fetch(`/api/v1/games/${this.props.routeParams.id}/reviews`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(formPayload),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        this.setState({ errors: [] })
        //add ID here so browser history is correct
        browserHistory.push(`/games/${this.props.routeParams.id}`)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors})
    }
  }
  render(){
    let errorHTML
    if (this.state.errors.length > 0) {
      errorHTML = this.state.errors.map(error => {
        return <li>{error}</li>
      })
    }
    return(
      <div className = "row">
        <div className= "panel alert">
          <ul>{errorHTML}</ul>
        </div>
        <div className = "panel small-8 small-centered columns">
          <h2>New Review Form</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Rating:
              <input type="number" placeholder="Enter A Rating From 1 to 5" max="5" min="1" value={this.state.rating} onChange={this.handleRatingChange}/>
            </label>
            <label>
              Review:
              <textarea value={this.state.body} onChange={this.handleBodyChange} />
            </label>
            <div className="small-8 columns small-centered small-block-grid-2">
              <li><button type="submit" value="Submit" >Submit</button></li>
              <li><Link to="/games"><button type="button" >Cancel</button></Link></li>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReviewFormContainer;
