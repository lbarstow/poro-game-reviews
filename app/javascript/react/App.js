import React, { Component } from 'react';
import GamesIndexContainer from './containers/GamesIndexContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
      <div>
        <GamesIndexContainer />
      </div>
    )
  }
}

export default App;
