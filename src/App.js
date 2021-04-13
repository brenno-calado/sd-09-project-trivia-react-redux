import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Configurations from './pages/Configurations';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/feedback" component={ Feedback } />
        <Route path="/configurations" component={ Configurations } />
        <Route path="/game" component={ Game } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
