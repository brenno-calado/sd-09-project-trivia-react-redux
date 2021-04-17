import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import style from './Feedback.module.css';

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
      localStorage.setItem(
        'ranking',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('ranking')),
          dataObj,
        ]),
      );
    }
  }

  renderResultsInfo() {
    const state = JSON.parse(localStorage.getItem('state'));
    const {
      player: { score, assertions },
    } = state;
    const minAssertions = 3;
    return (
      <section className={ style.section }>
        <h2 className={ style.feedback } data-testid="feedback-text">
          {assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h2>
        <div>
          Pontuação total:
          <p className={ style.score } data-testid="feedback-total-score">
            {score}
          </p>
        </div>
        <div>
          Número de acertos:
          <p className={ style.assertions } data-testid="feedback-total-question">
            {assertions}
          </p>
        </div>
        {this.setStorageRanking()}
      </section>
    );
  }

  renderButtonReplay() {
    return (
      <Link className={ style.link } to="/">
        <button className={ style.button } type="button" data-testid="btn-play-again">
          Jogar novamente
        </button>
      </Link>
    );
  }

  renderButtonRanking() {
    return (
      <Link className={ style.link } to="/ranking">
        <button className={ style.button } type="button" data-testid="btn-ranking">
          Ver ranking
        </button>
      </Link>
    );
  }

  render() {
    return (
      <>
        <Header />
        <main>
          {this.renderResultsInfo()}
          {this.renderButtonReplay()}
          {this.renderButtonRanking()}
        </main>
      </>
    );
  }
}

export default Feedback;
