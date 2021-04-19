import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scoreThisCorrectAnswer from '../actions/score';
import Timer from './Timer';
import style from './Question.module.css';

const INITIAL_STATE = {
  isAnswered: false,
  answersOrder: [],
  timer: 30,
};

class Question extends Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
    };
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  componentDidMount() {
    this.setRandomAnswersOrder();
    this.timerCountdown();
  }

  componentDidUpdate() {
    const { isAnswered } = this.state;
    if (!isAnswered) {
      this.timerCountdown();
    }
  }

  setRandomAnswersOrder() {
    const CONST_RANDOM = 0.5;
    const {
      question: { incorrect_answers: incorrectAnswers },
    } = this.props;
    const answersLength = incorrectAnswers.length + 1;
    const randomOrderArray = Array.from(
      { length: answersLength },
      (_, index) => index,
    ).sort(() => Math.random() - CONST_RANDOM);
    this.setState({ answersOrder: randomOrderArray });
  }

  checkAnswer(answerButton) {
    const {
      question: { correct_answer: correctAnswer, difficulty },
      scoreCorrect: scoreCorrectDispatch,
    } = this.props;
    const { timer } = this.state;
    const isCorrectAnswer = answerButton === correctAnswer;
    if (isCorrectAnswer) scoreCorrectDispatch({ difficulty, timeLeft: timer });
  }

  async timerCountdown() {
    const { timer, isAnswered } = this.state;
    const TIME_INTERVAL = 1000;
    const shouldCountDown = timer > 0 && !isAnswered;
    setTimeout(() => {
      if (shouldCountDown) this.setState({ timer: timer - 1 });
    }, TIME_INTERVAL);
  }

  answerQuestion({ target: { textContent: answerButton } }) {
    this.checkAnswer(answerButton);
    this.setState({ isAnswered: true });
  }

  renderAnswers() {
    const { isAnswered, answersOrder, timer } = this.state;
    const timeout = timer === 0;
    const {
      question: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props;

    const correctAnswersButtons = (
      <button
        className={ style.button }
        key="correct"
        type="button"
        data-testid="correct-answer"
        { ...(isAnswered && { className: style.correct }) }
        onClick={ isAnswered ? () => null : this.answerQuestion }
        disabled={ timeout || isAnswered }
      >
        {correctAnswer}
      </button>
    );
    const incorrectAnswersButtons = incorrectAnswers.map(
      (incorrectAnswer, index) => (
        <button
          className={ style.button }
          type="button"
          key={ index + 1 }
          data-testid={ `wrong-answer-${index}` }
          { ...(isAnswered && { className: style.incorrect }) }
          onClick={ isAnswered ? () => null : this.answerQuestion }
          disabled={ timeout || isAnswered }
        >
          {incorrectAnswer}
        </button>
      ),
    );
    const answers = [correctAnswersButtons, ...incorrectAnswersButtons];
    return answersOrder.map((displayIndex) => answers[displayIndex]);
  }

  renderNextButton() {
    const { goToNextQuestion } = this.props;
    return (
      <button
        className={ style.next }
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          this.setState({ isAnswered: false, timer: 30 });
          goToNextQuestion();
        } }
      >
        Next »
      </button>
    );
  }

  render() {
    const {
      question: { category, question },
    } = this.props;
    const { timer, isAnswered } = this.state;

    return (
      <>
        <Timer timer={ timer } />
        <div className={ style.div }>
          <p className={ style.category } data-testid="question-category">
            {category}
          </p>
          <p className={ style.text } data-testid="question-text">
            {question}
          </p>
          {this.renderAnswers()}
          {(isAnswered || timer === 0) && this.renderNextButton()}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  scoreCorrect: scoreThisCorrectAnswer,
};

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  scoreCorrect: PropTypes.func.isRequired,
  goToNextQuestion: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Question);
