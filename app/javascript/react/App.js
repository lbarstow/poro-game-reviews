import React, { Component } from 'react';
import GamesIndexContainer from './containers/GamesIndexContainer';
import GameFormContainer from './containers/GameFormContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
      <div>
        <h1>Hello from the React App file</h1>
        <GamesIndexContainer />
      </div>
    )
  }
}

export default App;
