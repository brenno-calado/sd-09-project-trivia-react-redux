import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.menssageFeedBack = this.menssageFeedBack.bind(this);
    this.updateRanking = this.updateRanking.bind(this);
  }

  componentDidMount() {
    this.updateRanking();
  }

  menssageFeedBack() {
    const numberThree = 3;
    const { assertions } = this.props;
    if (assertions < numberThree) {
      return (<p data-testid="feedback-text">Podia ser melhor...</p>);
    }
    return (<p data-testid="feedback-text">Mandou bem!</p>);
  }

  updateRanking() {
    const { name, score, userImageId } = this.props;
    if (name.length !== 0) {
      const userObj = {
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${userImageId}`,
      };
      const ranking = localStorage.getItem('ranking');
      if (ranking === null) {
        localStorage.setItem('ranking', JSON.stringify([userObj]));
      } else {
        const recoveredRanking = JSON.parse(ranking);
        localStorage.setItem('ranking', JSON.stringify([...recoveredRanking, userObj]));
      }
    }
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        {this.menssageFeedBack()}
        <p>
          Pontuação final:
          <span data-testid="feedback-total-score">
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
  userImageId: state.player.userImageId,
});

Feedback.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  assertions: PropTypes.number,
  score: PropTypes.number,
  useImageId: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
