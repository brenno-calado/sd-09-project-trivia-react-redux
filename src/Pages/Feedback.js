import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import FeedHeader from '../Components/FeedHeader';
import {
  rightAnswers,
  playerLogin,
  requestApiToken,
  requestApiQuestions,
  wrongAnswers,
  playerScore,
  updateIndex,
  setZeroState } from '../redux/actions';
import './feedback.css';
import Gz from '../Components/gz';

class Feedback extends Component {
  constructor() {
    super();
    this.message = this.message.bind(this);
    this.setGlobalState = this.setGlobalState.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const hash = md5(player.gravatarEmail).toString();
    ranking.push({
      name: player.name,
      score: player.score,
      picture: `https://www.gravatar.com/avatar/${hash}`,
    });
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  setGlobalState() {
    const { dispatchCorrect, dispatchWrong, dispatchNameEmail, dispatchIndex,
      dispatchScore, getToken, getQuestions, dispatchZero } = this.props;
    dispatchCorrect(0);
    dispatchWrong(0);
    dispatchNameEmail('', '');
    dispatchScore(0);
    getToken();
    getQuestions();
    dispatchIndex(0);
    dispatchZero(0, 0);
  }

  message() {
    const { correctAnswers, score } = this.props;
    return (
      <div>
        <p data-testid="feedback-total-score">
          { `Bowa! Seu score atual é: ${score}` }
        </p>
        <p data-testid="feedback-total-question">
          { `Acertou um total de: ${correctAnswers}` }
        </p>
      </div>
    );
  }

  score() {
    const { correctAnswers } = this.props;
    const tres = 3;
    if (correctAnswers >= tres) {
      return (
        <p data-testid="feedback-text">
          Mandou bem! Mas será que está em primeiro no ranking?
        </p>
      );
    }
    return <p data-testid="feedback-text">Podia ser melhor...</p>;
  }

  render() {
    return (
      <div className="feedContainer">
        <FeedHeader />
        <div className="feedCard">
          <div className="score">{ this.message() }</div>
          <Gz />
          <div className="msg">{ this.score() }</div>
          <div className="feedBtns">
            <Link to="/">
              <button
                className="btnReset"
                type="button"
                data-testid="btn-play-again"
                onClick={ this.setGlobalState }
              >
                Jogar novamente
              </button>
            </Link>
            <Link to="/ranking">
              <button className="btnRanking" type="button" data-testid="btn-ranking">
                Ver Ranking
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  correctAnswers: player.rightAnswers,
  score: player.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCorrect: (num) => dispatch(rightAnswers(num)),
  dispatchWrong: (num) => dispatch(wrongAnswers(num)),
  dispatchScore: (score) => dispatch(playerScore(score)),
  dispatchNameEmail: (email, name) => dispatch(playerLogin(email, name)),
  getToken: () => dispatch(requestApiToken()),
  getQuestions: () => dispatch(requestApiQuestions()),
  dispatchIndex: (index) => dispatch(updateIndex(index)),
  dispatchZero: (score, right) => dispatch(setZeroState(score, right)),
});

Feedback.propTypes = {
  dispatchZero: PropTypes.func.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  dispatchIndex: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  dispatchNameEmail: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  dispatchCorrect: PropTypes.func.isRequired,
  dispatchWrong: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
