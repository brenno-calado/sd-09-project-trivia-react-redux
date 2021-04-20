import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import '../styles/pages/Feedback.css';

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
      return (
        <>
          <img
            src="https://i.giphy.com/media/BY8ORoRpnJDXeBNwxg/giphy.webp"
            alt="frustrated"
          />
          <p data-testid="feedback-text">Podia ser melhor...</p>
        </>
      );
    }
    return (
      <>
        <img
          src="https://i.giphy.com/media/l0amJzVHIAfl7jMDos/200.webp"
          alt="yay"
        />
        <p data-testid="feedback-text">Mandou bem!</p>
      </>
    );
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
      <div className="feedback-container">
        <Header />
        <main className="feedback-main-page">
          { this.menssageFeedBack() }
          <p>
            <span className="label">Final Score: </span>
            <span data-testid="feedback-total-score">
              {score}
            </span>
          </p>
          <p>
            <span className="label">Right Answers: </span>
            <span data-testid="feedback-total-question">
              {assertions}
            </span>
          </p>
          <div className="feedback-buttons-container">
            <Link to="/">
              <button type="button" data-testid="btn-play-again">
                Play Again
              </button>
            </Link>
            <Link to="/ranking">
              <button type="button" data-testid="btn-ranking">
                Ranking
              </button>
            </Link>
          </div>
        </main>
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
