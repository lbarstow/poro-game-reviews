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
      user_id: this.props.currentUserId,
      categories: this.state.categories
    };
    let errors = []
    if (formPayload.user_id == null) {
      errors.push("Please sign in")
    }
    if (formPayload.name == null || formPayload.name == '') {
      errors.push("Title is required")
    }
    if (formPayload.description == null || formPayload.description == '') {
      errors.push("Description is required")
    }
    if (formPayload.description.length < 50) {
      errors.push("Description must be at least 50 characters")
    }
    if (formPayload.min_player_count == null || formPayload.min_player_count == '' ) {
      errors.push("Minimum player count is required")
    }else if (!Number.isInteger(parseFloat(formPayload.min_player_count))) {
      errors.push("Minimum player count must be an integer")
    }
    if (formPayload.max_player_count == null || formPayload.max_player_count == '' ) {
      errors.push("Maximum player count is required")
    }else if (!Number.isInteger(parseFloat(formPayload.max_player_count))) {
      errors.push("Maximum player count must be an integer")
    }
    if (parseInt(formPayload.max_player_count) < parseInt(formPayload.min_player_count)) {
      errors.push("Maximum players must be greater than or equal to minimum players")
    }
    if (errors.length === 0) {
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
        this.setState({ errors: [] })
        browserHistory.push('/games')
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors})
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

            <label>
              Categories:
              <fieldset>
              <div className = "small-6 columns">
                <label>
                 <input type="checkbox" id="first" name="abstract strategy" value="1" onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="first">Abstract Strategy</label>
                </label>
                <label>
                 <input type="checkbox" id="second" name="card" value="2"  onChange = {this.handleCheckboxChange}/>
                 <label htmlFor="second">Card</label>
                </label>
                <label>
                   <input type="checkbox" id="third" name="cooperative" value="3" onChange = {this.handleCheckboxChange}/>
                   <label htmlFor="third">Cooperative</label>
                </label>
                <label>
                   <input type="checkbox" id="fourth" name="deck builder" value="4" onChange = {this.handleCheckboxChange}/>
                   <label htmlFor="fourth">Deck Builder</label>
                </label>
                <label>
                   <input type="checkbox" id="fifth" name="deduction" value="5" onChange = {this.handleCheckboxChange}/>
                   <label htmlFor="fifth">Deduction</label>
                </label>
                <label>
                  <input type="checkbox" id="sixth" name="dice" value="6" onChange = {this.handleCheckboxChange}/>
                  <label htmlFor="sixth">Dice</label>
                </label>
               </div>
               <div className="small-6 columns">
                 <label>
                   <input type="checkbox" id="seventh" name="euro" value="7" onChange = {this.handleCheckboxChange}/>
                   <label htmlFor="seventh">Euro</label>
                 </label>
                 <label>
                   <input type="checkbox" id="eighth" name="party" value="8" onChange = {this.handleCheckboxChange}/>
                   <label htmlFor="eighth">Party</label>
                 </label>
                 <label>
                   <input type="checkbox" id="ninth" name="puzzle" value="9" onChange = {this.handleCheckboxChange}/>
                   <label htmlFor="ninth">Puzzle</label>
                 </label>
                 <label>
                   <input type="checkbox" id="tenth" name="roleplaying" value="10" onChange = {this.handleCheckboxChange}/>
                   <label htmlFor="tenth">Roleplaying</label>
                 </label>
                 <label>
                   <input type="checkbox" id="eleventh" name="thematic" value="11" onChange = {this.handleCheckboxChange}/>
                   <label htmlFor="eleventh">Thematic</label>
                 </label>
                 <label>
                   <input type="checkbox" id="twelveth" name="word" value="12" onChange = {this.handleCheckboxChange}/>
                   <label htmlFor="twelveth">Word</label>
                 </label>
               </div>
             </fieldset>
            </label>

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
