import React from 'react';
import { PropTypes } from 'prop-types';

class Question extends React.Component {
  render() {
    const { question: {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      question,
      category,
    } } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h2 data-testid="question-text">{question}</h2>
        <button
          data-testid="correct-answer"
          type="button"
          onClick={ this.handleClick }
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((element, i) => (
          <button
            data-testid={ `wrong-answer-${i}` }
            type="button"
            key={ element }
            onClick={ this.handleClick }
          >
            {element}
          </button>
        ))}
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    category: PropTypes.string,
  }),
}.isRequired;

export default Question;
