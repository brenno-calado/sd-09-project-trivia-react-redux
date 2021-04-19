import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { nextQuestion, receiveDataPlayer } from '../actions';
import { shuffleAnswers, decodeHTMLEntities } from '../services/functions';
import '../App.css';

const INITIAL_STATE = {
  currentCount: 30,
  redirect: false,
  isDisabled: false,
};

let CORRECT_ANSWER = '';
let NEW_ARRAY_ANSWERS = [];

const THOUSAND = 1000;
const THIRTY_THOUSAND = 30000;

class Gaming extends React.Component {
  constructor(props) {
    super(props);

    this.verifyAll = this.verifyAll.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.selectedAnswer = this.selectedAnswer.bind(this);
    this.nextQuestionFunction = this.nextQuestionFunction.bind(this);
    this.resultsPointPlayer = this.resultsPointPlayer.bind(this);

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.verifyAll();
    this.getAnswers();
    this.setTimer = setInterval(() => this.timer(), THOUSAND);
    this.disabledButtons = setTimeout(
      () => this.selectedAnswer(),
      THIRTY_THOUSAND,
    );
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
    clearTimeout(this.disabledButtons);
  }

  getAnswers(object) {
    if (object) {
      const {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer,
      } = object;

      if (correctAnswer !== CORRECT_ANSWER) {
        NEW_ARRAY_ANSWERS.push({
          answer: decodeHTMLEntities(correctAnswer),
          testid: 'correct-answer',
          className: 'green-border',
        });

        incorrectAnswers.map((incorrect, index) => NEW_ARRAY_ANSWERS.push({
          answer: decodeHTMLEntities(incorrect),
          testid: `wrong-answer-${index}`,
          className: 'red-border',
        }));

        CORRECT_ANSWER = decodeHTMLEntities(correctAnswer);

        return shuffleAnswers(NEW_ARRAY_ANSWERS);
      }

      return NEW_ARRAY_ANSWERS;
    }
  }

  verifyAll() {
    const { responseCode } = this.props;
    const numberResponse = 3;

    if (
      !localStorage.getItem('state')
    || responseCode.length === 0
    || responseCode === numberResponse
    ) {
      this.setState({ redirect: true });
    }
  }

  resultsPointPlayer() {
    const {
      questionNumber,
      questionsState,
      playerState,
      picture,
      setDataPlayer,
    } = this.props;
    const { currentCount } = this.state;

    const { difficulty } = questionsState[questionNumber];
    const objDiff = { hard: 3, medium: 2, easy: 1 };
    const TEN = 10;

    const assertions = playerState.assertions + 1;
    const total = (level) => TEN + currentCount * objDiff[level];
    const score = playerState.score + total(difficulty);

    const player = { ...playerState, assertions, score };

    setDataPlayer(player, picture);
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  selectedAnswer(event) {
    const { currentCount } = this.state;
    const buttonText = event ? event.target.innerText : '';

    clearInterval(this.setTimer);
    clearTimeout(this.disabledButtons);
    this.setState({ isDisabled: true });

    if (currentCount > 0 && CORRECT_ANSWER === buttonText) {
      this.resultsPointPlayer();
    }
  }

  nextQuestionFunction() {
    const {
      questionNumber,
      nextQuestionDispatch,
      playerState,
      picture,
      setDataPlayer,
    } = this.props;
    const maxQuestionNumber = 4;
    NEW_ARRAY_ANSWERS = [];

    if (questionNumber < maxQuestionNumber) {
      const next = questionNumber + 1;

      this.setState(INITIAL_STATE);
      nextQuestionDispatch(next);
    } else {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const rankingObject = {
        name: playerState.name,
        score: playerState.score,
        picture,
      };

      if (!ranking) {
        localStorage.setItem('ranking', JSON.stringify([rankingObject]));
      } else {
        localStorage.setItem('ranking', JSON.stringify([...ranking, rankingObject]));
      }

      setDataPlayer(playerState, picture);
      this.setState({ redirect: true });
    }
  }

  // Função timer
  // https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app
  timer() {
    const { currentCount, setTimer } = this.state;
    const newCount = currentCount - 1;

    if (newCount >= 0) {
      this.setState({ currentCount: newCount });
    } else {
      clearInterval(setTimer);
    }
  }

  renderAnswers(answers, isDisabled) {
    return answers.map(({ answer, testid, className }, index) => (
      <li key={ `answer-${index}` }>
        <button
          type="button"
          data-testid={ testid }
          disabled={ isDisabled }
          onClick={ this.selectedAnswer }
          className={ isDisabled ? className : null }
        >
          {answer}
        </button>
      </li>
    ));
  }

  render() {
    const { questionsState, questionNumber } = this.props;
    const { redirect, isDisabled, currentCount } = this.state;
    const answers = this.getAnswers(questionsState[questionNumber]);
    const maxQuestionNumber = 4;

    return redirect ? (
      <Redirect to={ questionNumber === maxQuestionNumber ? '/feedback' : '/' } />
    ) : (
      <>
        <Header />
        {questionsState.length === 0 ? (
          <p>loading</p>
        ) : (
          <div>
            <p>{currentCount}</p>
            <p data-testid="question-category">
              {questionsState[questionNumber].category}
            </p>
            <p data-testid="question-text">
              {decodeHTMLEntities(questionsState[questionNumber].question)}
            </p>
            {this.renderAnswers(answers, isDisabled)}
            <button
              type="button"
              hidden={ !isDisabled }
              data-testid="btn-next"
              onClick={ this.nextQuestionFunction }
            >
              Próxima
            </button>
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nextQuestionDispatch: (questionNumber) => dispatch(nextQuestion(questionNumber)),
  setDataPlayer: (player, picture) => dispatch(receiveDataPlayer(player, picture)),
});

const mapStateToProps = (state) => ({
  playerState: state.playerReducer.player,
  picture: state.playerReducer.picture,
  questionsState: state.questionsReducer.questions,
  questionNumber: state.questionsReducer.questionNumber,
  responseCode: state.questionsReducer.responseCode,
});

Gaming.propTypes = {
  questionDispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Gaming);
