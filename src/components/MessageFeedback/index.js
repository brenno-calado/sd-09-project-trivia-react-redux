import React from 'react';
import { Link } from 'react-router-dom';
import greatjob from '../../assets/greatjob.svg';
import ohno from '../../assets/ohno.png';
import './styles.css';

class MessageFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: JSON.parse(localStorage.getItem('state')).player.assertions,
      score: JSON.parse(localStorage.getItem('state')).player.score,
    };
  }

  render() {
    const valuePattern = 3;
    const { assertions, score } = this.state;
    return (
      <div className="container-page-feedback">
        <div className="container-messages">
          <h1 className="feedback-text" data-testid="feedback-text">
            { (assertions >= valuePattern) ? 'Mandou bem!' : 'Podia ser melhor...' }
          </h1>
          <p data-testid="feedback-total-score">{ score }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </div>
        {
          (assertions >= valuePattern)
            ? <img className="great-img" src={ greatjob } alt="Great Job" />
            : <img className="ohno-img" src={ ohno } alt="Oh no" />
        }
        <Link to="/">
          <button
            className="btn-play-again"
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

export default MessageFeedback;
