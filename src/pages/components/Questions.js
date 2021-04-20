import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import * as Api from '../../service/Api';
import '../../styles/components/Questions.css';
import { stopTime, addPlayer, restartTimer, startTimer } from '../../redux/actions/index';

// HTML entity encoder/decoder
const he = require('he');

const NUMBER = -1;

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      question: '',
      difficulty: '',
      alternatives: [],
      correctAnswer: '',
      questionIndex: 0,
      isSelected: false,
      disableAlternatives: false,
      nextQuestion: false,
      redirectToFeedback: false,
      isFetching: true,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.disableAlternatives = this.disableAlternatives.bind(this);
    this.getDifficulty = this.getDifficulty.bind(this);
    this.UpdateScore = this.UpdateScore.bind(this);
    this.enableNextButton = this.enableNextButton.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  componentDidMount() {
    const { stopTime: isTimeStoped, dispatchStopTime } = this.props;
    this.getQuestions();
    if (isTimeStoped) dispatchStopTime();
  }

  componentDidUpdate(prevProps) {
    const { timesUp } = this.props;
    if ((prevProps.timesUp !== timesUp) && (timesUp)) {
      this.disableAlternatives();
      this.enableNextButton();
    }
  }

  async getQuestions() {
    const { questionIndex } = this.state;
    const { token, dispatchStartTimer } = this.props;
    const questions = await Api.fetchQuestions(token);
    this.setState({
      category: questions[questionIndex].category,
      question: he.decode(questions[questionIndex].question),
      difficulty: questions[questionIndex].difficulty,
      alternatives: [
        he.decode(questions[questionIndex].correct_answer),
        ...questions[questionIndex].incorrect_answers
          .map((incorrectAnswer) => he.decode(incorrectAnswer)),
      ].sort(),
      correctAnswer: he.decode(questions[questionIndex].correct_answer),
      isFetching: false,
    });
    dispatchStartTimer();
  }

  getDifficulty() {
    const { difficulty } = this.state;
    let difficultNumber = 0;
    const NUMBER_ONE = 1;
    const NUMBER_TWO = 2;
    const NUMBER_THREE = 3;
    if (difficulty === 'easy') difficultNumber = NUMBER_ONE;
    else if (difficulty === 'medium') difficultNumber = NUMBER_TWO;
    else if (difficulty === 'hard') difficultNumber = NUMBER_THREE;
    return difficultNumber;
  }

  enableNextButton() {
    this.setState({ nextQuestion: true });
  }

  UpdateScore() {
    const { seconds, dispatchPlayer, player: playerObj } = this.props;
    const { score, assertions } = playerObj;
    const NUMBER_TEN = 10;
    let totalScore = score;
    let totalAssertions = assertions;
    const difficulty = this.getDifficulty();
    totalScore += NUMBER_TEN + (seconds * difficulty);
    totalAssertions += 1;
    playerObj.score = totalScore;
    playerObj.assertions = totalAssertions;
    const object = { player: playerObj };
    dispatchPlayer(playerObj);
    localStorage.setItem('state', JSON.stringify(object));
  }

  handleClick({ target }) {
    const QUESTIONS_LIMIT = 5;
    const { value } = target;
    const { questionIndex } = this.state;
    const { dispatchStopTime } = this.props;
    if ((value === 'correct-answer') && (questionIndex < QUESTIONS_LIMIT)) {
      this.UpdateScore();
      this.setState((state) => ({ questionIndex: state.questionIndex + 1 }));
    } else if (questionIndex < QUESTIONS_LIMIT) {
      this.setState((state) => ({ questionIndex: state.questionIndex + 1 }));
    }
    this.setState({ isSelected: true });
    this.disableAlternatives();
    dispatchStopTime();
    this.enableNextButton();
  }

  nextQuestion() {
    const QUESTIONS_LIMIT = 5;
    const { dispatchRestartTimer, dispatchStartTimer } = this.props;
    const { questionIndex } = this.state;
    if (questionIndex === QUESTIONS_LIMIT) {
      this.setState({ redirectToFeedback: true });
    } else {
      this.setState(() => ({
        isSelected: false,
        disableAlternatives: false,
        nextQuestion: false,
        isFetching: true,
      }), () => this.getQuestions());
      dispatchRestartTimer();
    }
    dispatchStartTimer();
  }

  disableAlternatives() {
    this.setState({ disableAlternatives: true });
  }

  renderButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Next
      </button>
    );
  }

  renderQuestion() {
    const {
      category,
      question,
      alternatives,
      correctAnswer,
      isSelected,
      disableAlternatives,
    } = this.state;
    let indexQuestion = NUMBER;
    return (
      <>
        <div className="question-header-container">
          <h4 data-testid="question-category">{ category }</h4>
          <p data-testid="question-text">{ question }</p>
        </div>
        <div className="alternatives-container">
          { alternatives.map((alternative, index) => {
            if (alternative === correctAnswer) {
              return (
                <button
                  type="button"
                  key={ index }
                  className={ (isSelected) ? 'correct-answer' : undefined }
                  data-testid="correct-answer"
                  onClick={ this.handleClick }
                  disabled={ disableAlternatives }
                  value="correct-answer"
                >
                  { alternative }
                </button>);
            }
            indexQuestion += 1;
            return (
              <button
                type="button"
                key={ index }
                className={ (isSelected) ? 'wrong-answer' : undefined }
                data-testid={ `wrong-answer-${indexQuestion}` }
                onClick={ this.handleClick }
                disabled={ disableAlternatives }
                value="wrong-answer"
              >
                { alternative }
              </button>);
          })}
        </div>
      </>
    );
  }

  render() {
    const { nextQuestion, redirectToFeedback, isFetching } = this.state;
    return (
      <div>
        { !(isFetching) ? (
          <div className="question-container">
            { this.renderQuestion() }
            { nextQuestion && this.renderButton() }
            { (redirectToFeedback) && <Redirect to="/feedback" /> }
          </div>) : (<div className="loading" />) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginUser.token,
  timesUp: state.timer.timesUp,
  seconds: state.timer.seconds,
  player: state.player,
  startTimer: state.timer.startTimer,
  stopTime: state.timer.stopTime,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchStopTime: () => dispatch(stopTime()),
  dispatchPlayer: (object) => dispatch(addPlayer(object)),
  dispatchRestartTimer: () => dispatch(restartTimer()),
  dispatchStartTimer: () => dispatch(startTimer()),
});

Questions.propTypes = {
  token: PropTypes.string,
  timesUp: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
