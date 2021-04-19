import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Feedback extends React.Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = state;
    const numberScore = 3;

    return (
      <div>
        <Header />
        <p data-testid="correct-answer"> </p>
        <p data-testid="feedback-text">
          { assertions >= numberScore ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-score">
            { assertions }
          </span>
          {' '}
          questões!
        </p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-question">
            { score }
          </span>
          {' '}
          pontos.
        </p>
        <Link to="/gaming">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}
