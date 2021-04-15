import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Question from './pages/Question';
import Feedback from './pages/Feedback';

// import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/question" component={ Question } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
