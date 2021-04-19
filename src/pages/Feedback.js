import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.menssageFeedBack = this.menssageFeedBack.bind(this);
  }

  menssageFeedBack() {
    const numberThree = 3;
    const { assertions } = this.props;
    if (assertions < numberThree) {
      return (<p data-testid="feedback-text">Podia ser melhor...</p>);
    }
    return (<p data-testid="feedback-text">Mandou bem!</p>);
  }

  render() {
    const { score, assertions } = this.props;
    console.log(typeof (assertions));
    return (
      <div>
        <Header />
        {this.menssageFeedBack()}
        <p>
          Pontuação final:
          <span
            data-testid="feedback-total-score"
          >
            {score}
          </span>
        </p>
        <p>
          Total acertos:
          <span
            data-testid="feedback-total-question"
          >
            {assertions}
          </span>
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginUser.name,
  email: state.loginUser.email,
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
