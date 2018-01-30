import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

class GameFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      minPlayers: '',
      maxPlayers: '',
      categories: [],
      currentUserId: JSON.parse(document.getElementById('app').dataset.currentUser).id,
      errors: []

    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleMinPlayerChange = this.handleMinPlayerChange.bind(this);
    this.handleMaxPlayerChange = this.handleMaxPlayerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
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
  handleCheckboxChange(event) {
    let oldCategories = this.state.categories
    if (oldCategories.includes(event.target.value)) {
      this.setState({ categories: oldCategories.filter(e=> e!== event.target.value) })
    } else {
      this.setState({ categories: oldCategories.concat(event.target.value) })
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let formPayload = {
      name: this.state.title,
      description: this.state.description,
      min_player_count: this.state.minPlayers,
      max_player_count: this.state.maxPlayers,
      user_id: this.state.currentUserId,
      categories: this.state.categories
    };
    if (formPayload.user_id == null) {
      let oldErrors = this.state.errors
      this.setState({ errors: oldErrors.concat("Please sign in") })
    } else {
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
      .then(response => {
        browserHistory.push('/games')
        this.setState({ errors: [] })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render() {
    let errorHTML
    if (this.state.errors.length > 0) {
      errorHTML = this.state.errors.map(error => {
        return <li>{error}</li>
      })
    }
    return(
      <div className = "row">
      <div className= "panel alert">
      {errorHTML}
      </div>
        <div className = "panel small-8 small-centered columns">
          <h2>New Game Form</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Game Name:
              <input type="text"  value={this.state.title} onChange={this.handleTitleChange} />
            </label>
            <label>
              Description:
              <textarea value={this.state.description} onChange={this.handleDescriptionChange} />
            </label>


              Categories
              <fieldset>
              <div className = "small-6 columns">
               <p>
                 <input type="checkbox" id="first" name="abstract strategy" value="1" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="first">Abstract Strategy</label>
               </p>
               <p>
                 <input type="checkbox" id="second" name="card" value="2"  onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="second">Card</label>
               </p>
               <p>
                 <input type="checkbox" id="third" name="cooperative" value="3" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="third">Cooperative</label>
               </p>
               <p>
                 <input type="checkbox" id="fourth" name="deck builder" value="4" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="fourth">Deck Builder</label>
               </p>
               <p>
                 <input type="checkbox" id="fifth" name="deduction" value="5" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="fifth">Deduction</label>
               </p>
               <p>
                 <input type="checkbox" id="sixth" name="dice" value="6" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="sixth">Dice</label>
               </p>
               </div>
               <div className="small-6 columns">
               <p>
                 <input type="checkbox" id="seventh" name="euro" value="7" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="seventh">Euro</label>
               </p>
               <p>
                 <input type="checkbox" id="eighth" name="party" value="8" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="eighth">Party</label>
               </p>
               <p>
                 <input type="checkbox" id="ninth" name="puzzle" value="9" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="ninth">Puzzle</label>
               </p>
               <p>
                 <input type="checkbox" id="tenth" name="roleplaying" value="10" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="tenth">Roleplaying</label>
               </p>
               <p>
                 <input type="checkbox" id="eleventh" name="thematic" value="11" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="eleventh">Thematic</label>
               </p>
               <p>
                 <input type="checkbox" id="twelveth" name="word" value="12" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="twelveth">Word</label>
               </p>
               </div>
             </fieldset>

            <span>
              <label>
                Number of Players:
                <input type="number" placeholder="min" value={this.state.minPlayers} onChange={this.handleMinPlayerChange}/>
              </label>
              <label>
                to
                <input type="number" placeholder="max" value={this.state.maxPlayers} onChange={this.handleMaxPlayerChange}/>
              </label>
            </span>
            <div className="small-8 columns small-centered small-block-grid-2">
              <li><button type="submit" value="Submit" >Submit</button></li>
              <li><Link to="/games"><button type="button" >Cancel</button></Link></li>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default GameFormContainer;
