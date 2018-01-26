import React, { Component } from 'react';
import { Link } from 'react-router'

class GameFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      minPlayers: 1,
      maxPlayers: 1
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleMinPlayerChange = this.handleMinPlayerChange.bind(this);
    this.handleMaxPlayerChange = this.handleMaxPlayerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleMinPlayerChange(event) {
    this.setState({ minPlayers: event.target.value });
  }

  handleMaxPlayerChange(event) {
    this.setState({ maxPlayers: event.target.value });
  }


  handleSubmit(event) {
    event.preventDefault();
    let formPayload = {
      name: this.state.title,
      description: this.state.description,
      min_player_count: this.state.minPlayers,
      max_player_count: this.state.maxPlayers
    };
    fetch('/api/v1/games', {
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
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    //put some kind of router call here if submit worked?
  }

  render() {
    return(
      <div>
        <h2>New Game Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Game Name:
            <input type="text"  value={this.state.title} onChange={this.handleTitleChange} />
          </label>
          <label>
            Description:
            < textarea value={this.state.description} onChange={this.handleDescriptionChange} />
          </label>
          <label>
            Number of Players:
           < input type="number" value={this.state.minPlayers} onChange={this.handleMinPlayerChange}/>
          </label>
          <label>
            to
            < input type="number" value={this.state.maxPlayers} onChange={this.handleMaxPlayerChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link to="/games"><button type="button">Cancel</button></Link>
      </div>
    )
  }
}

export default GameFormContainer;
