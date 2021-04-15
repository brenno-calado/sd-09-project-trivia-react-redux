import './css/feedback.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { string, objectOf } from 'prop-types';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.createHeader = this.createHeader.bind(this);
    this.FeedbackMessage = this.FeedbackMessage.bind(this);
    this.gameResume = this.gameResume.bind(this);
  }

  createHeader() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state) {
      const { name, score, gravatarEmail } = state.player;
      return (
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
            alt="imagem do Gravatar"
            data-testid="header-profile-picture"
          />
          <h4 data-testid="header-player-name">{ name }</h4>
          <h4 data-testid="header-score">{ score }</h4>
        </header>
      );
    }
  }

  FeedbackMessage() {
    const { assertions } = this.props;
    const playerScore = 3;
    if (assertions < playerScore) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    } return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  gameResume() {
    const { assertions } = this.props;
    const state = JSON.parse(localStorage.getItem('state'));
    return (
      <div className="total-score">
        <h5>
          {'Seu placar foi de '}
          <span data-testid="feedback-total-score">{state.player.score}</span>
          {' pontos'}
        </h5>
        <h5>
          {'Acertou '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' perguntas'}
        </h5>
      </div>
    );
  }

  render() {
    return (
      <div className="feedback">
        {/* { this.createHeader() } */}
        <p data-testid="feedback-text">FEEDBACK</p>
        { this.FeedbackMessage() }
        { this.gameResume() }
        <Link to="/">
          <button data-testid="btn-play-again" type="button">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ((state) => ({
  assertions: state.player.assertions,
}));

Feedback.propTypes = {
  playerState: objectOf({
    name: string,
    gravatarEmail: string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
