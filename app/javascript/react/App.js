import React from 'react';
import GamesIndexContainer from './containers/GamesIndexContainer';
import GameFormContainer from './containers/GameFormContainer';
import GameShowContainer from './containers/GameShowContainer';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

const App = (props) => {

  return (
    <Router history={browserHistory}>
      <Route path='/' >
      <IndexRoute component={(props) => <GamesIndexContainer currentUserId={JSON.parse(document.getElementById('app').dataset.currentUser).id} {...props} />} />
        <Route path='/games' component={(props) => <GamesIndexContainer currentUserId={JSON.parse(document.getElementById('app').dataset.currentUser).id} {...props} />}  />
        <Route path='games/new' component={(props) => <GameFormContainer currentUserId={JSON.parse(document.getElementById('app').dataset.currentUser).id} {...props} />}  />
        <Route path='games/:id' component={(props) => <GameShowContainer currentUserId={JSON.parse(document.getElementById('app').dataset.currentUser).id} {...props} />} />
      </Route>
    </Router>
  )
}

export default App;
