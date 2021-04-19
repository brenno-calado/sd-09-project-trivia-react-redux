import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/FeedBack.css';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswers: 0,
      totalScore: 0,
    };
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.verifyAssertions = this.verifyAssertions.bind(this);
    this.scoreBoardGenerator = this.scoreBoardGenerator.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.rankingButton = this.rankingButton.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const getStorageInfos = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions, score } } = getStorageInfos;
    this.setState({
      correctAnswers: assertions,
      totalScore: score,
    });
  }

  verifyAssertions() {
    const { correctAnswers } = this.state;
    const numberToCompare = 3;
    if (correctAnswers < numberToCompare) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    );
  }

  scoreBoardGenerator() {
    const { correctAnswers, totalScore } = this.state;
    return (
      <div>
        <p data-testid="feedback-total-score">
          {totalScore}
        </p>
        <p data-testid="feedback-total-question">
          {correctAnswers}
        </p>
      </div>
    );
  }

  playAgain() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
      </Link>
    );
  }

  rankingButton() {
    return (
      <Link to="/ranking">
        <button
          type="button"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </Link>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">FeedBack</h1>
        { this.verifyAssertions() }
        { this.scoreBoardGenerator() }
        { this.playAgain() }
        { this.rankingButton() }
      </div>
    );
  }
}

export default FeedBack;
