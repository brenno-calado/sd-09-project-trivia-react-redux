import React from 'react';
import PropTypes from 'prop-types';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.Welldone = this.Welldone.bind(this);
    this.GetBetter = this.GetBetter.bind(this);
  }

  Welldone() {
    return (
      <div className="feedback-field">
        <p data-testid="feedback-text" className="feedbackText">Mandou bem!</p>
      </div>
    );
  }

  GetBetter() {
    return (
      <div className="feedback-field">
        <p data-testid="feedback-text" className="feedbackText">Podia ser melhor</p>
      </div>
    );
  }

  render() {
    const { asserts, score } = this.props;
    const number = 3;
    if (asserts >= number) {
      return (
        <div>
          { this.Welldone()}
          <span className="score-table">
            <span
              className="score-info"
              data-testid="feedback-total-score"
            >
              Your Score:
              { score }
            </span>
            <span
              className="score-info"
              data-testid="feedback-total-question"
            >
              Assertions:
              { asserts }
            </span>
          </span>
        </div>
      );
    }
    return (
      <div>
        {this.GetBetter()}
        <span className="score-table">
          <span
            className="score-info"
            data-testid="feedback-total-score"
          >
            Your Score:
            {' '}
            { score }
          </span>
          <span
            className="score-info"
            data-testid="feedback-total-question"
          >
            Acertos:
            {' '}
            { asserts }
          </span>
        </span>
      </div>
    );
  }
}

Scoreboard.propTypes = {
  asserts: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default Scoreboard;
