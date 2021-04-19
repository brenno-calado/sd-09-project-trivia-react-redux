import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/Settings';
import FeedbackPage from './pages/FeedbackPage';
import LoginPage from './pages/Login';
import RankingPage from './pages/RankingPage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route path="/main-page" component={ MainPage } />
      <Route path="/settings" component={ SettingsPage } />
      <Route path="/feedback" component={ FeedbackPage } />
      <Route path="/ranking" component={ RankingPage } />
    </Switch>
  );
}

// requisito 06
