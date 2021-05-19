import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {
  resetGame as resetGameAction,
} from '../actions';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history, resetGame } = this.props;
    return (
      <div className="feedback-page-container">
        <section className="feedback-container">
          <Header />
          <p className="feedback-text" data-testid="feedback-text">
            { assertions > 2 ? 'Mandou bem!' : 'Podia ser melhor...' }
          </p>
          <span>Score:</span>
          <p data-testid="feedback-total-score">{ score }</p>
          <span>Correct Answers:</span>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => { resetGame(); history.push('/'); } }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => { history.push('/ranking'); } }
          >
            Ver Ranking
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.gameBoard.assertions,
  score: state.game.gameBoard.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGameAction()),
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  score: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
