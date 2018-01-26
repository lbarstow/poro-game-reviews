import React from 'react';
import GamesIndexContainer from './containers/GamesIndexContainer';
import GameFormContainer from './containers/GameFormContainer';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

const App = (props) => {

  return (
    <Router history={browserHistory}>
      <Route path='/' >
        <IndexRoute component={GamesIndexContainer} />
        <Route path='/games' component={GamesIndexContainer} />
        <Route path='games/new' component={GameFormContainer} />
      </Route>
    </Router>
  )
}

export default App;
