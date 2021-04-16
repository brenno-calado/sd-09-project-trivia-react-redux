import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.renderResultsInfo = this.renderResultsInfo.bind(this);
    this.setStorageRanking = this.setStorageRanking.bind(this);
  }

  setStorageRanking() {
    const dataObj = JSON.parse(localStorage.getItem('state'));
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([dataObj]));
    } else {
      localStorage.setItem('ranking', JSON.stringify(
        [...JSON.parse(localStorage.getItem('ranking')), dataObj],
      ));
    }
  }

  renderResultsInfo() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = state;
    const minAssertions = 3;
    return (
      <section>
        <h2 data-testid="feedback-text">
          {assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h2>
        <div>
          Pontuação total:
          <p data-testid="feedback-total-score">
            {score}
          </p>
        </div>
        <div>
          Número de acertos:
          <p data-testid="feedback-total-question">
            {assertions}
          </p>
        </div>
        {this.setStorageRanking()}
      </section>
    );
  }

  renderButtonReplay() {
    return (
      <Link to="/">
        <button type="button" data-testid="btn-play-again">
          Jogar novamente
        </button>
      </Link>
    );
  }

  renderButtonRanking() {
    return (
      <Link to="/ranking">
        <button type="button" data-testid="btn-ranking">
          Ver ranking
        </button>
      </Link>
    );
  }

  render() {
    return (
      <main>
        <Header />
        {this.renderResultsInfo()}
        {this.renderButtonReplay()}
        {this.renderButtonRanking()}

      </main>
    );
  }
}

export default Feedback;
