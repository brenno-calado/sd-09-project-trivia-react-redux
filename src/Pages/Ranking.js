import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  rightAnswers,
  playerLogin,
  requestApiToken,
  requestApiQuestions,
  wrongAnswers,
  playerScore,
  updateIndex,
  setZeroState } from '../redux/actions';
import './ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.setGlobalState = this.setGlobalState.bind(this);
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

  render() {
    const players = JSON.parse(localStorage.getItem('ranking')) || [];
    return (
      <div className="rankingBg">
        <h1 className="rankingHeader" data-testid="ranking-title">Ranking</h1>
        <div className="rankingContainer">
          { players.sort((player1, player2) => {
            const um = 1;
            const menosUm = -1;
            const zero = 0;
            if (player1.score > player2.score) {
              return menosUm;
            }
            if (player1.score < player2.score) {
              return um;
            }
            return zero;
          }).map((player, index) => (
            <div className={ `rankingCards ${index}` } key={ player.name }>
              <img className="rankingImg" src={ player.picture } alt="player" />
              <p
                className="rankingName"
                data-testid={ `player-name-${index}` }
              >
                { `Nome: ${player.name}` }
              </p>
              <p
                className="rankingScore"
                data-testid={ `player-score-${index}` }
              >
                { `Score: ${player.score}` }
              </p>
            </div>
          ))}
        </div>
        <Link to="/">
          <button
            className="goBack"
            type="button"
            data-testid="btn-go-home"
            onClick={ this.setGlobalState }
          >
            BACK TO HOME
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  players: player.player,
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

Ranking.propTypes = {
  players: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  dispatchIndex: PropTypes.func.isRequired,
  dispatchNameEmail: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  dispatchCorrect: PropTypes.func.isRequired,
  dispatchWrong: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  dispatchZero: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
