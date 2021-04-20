import React, { Component } from 'react';
import Header from './components/Header';
import Questions from './components/Questions';
import Timer from './components/Timer';
import '../styles/pages/Game.css';

class Game extends Component {
  render() {
    return (
      <div className="game-container">
        <Header />
        <main className="game-main-page">
          <Timer />
          <Questions />
        </main>
      </div>
    );
  }
}

export default Game;
