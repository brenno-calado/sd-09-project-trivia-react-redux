import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { nextQuestion, receiveDataPlayer } from '../actions';
import '../App.css';

const INITIAL_STATE = {
  currentCount: 30,
  redirect: false,
  isDisabled: false,
};

// Questões
let CORRECT_ANSWER = '';
let NEW_ARRAY_ANSWERS = [];

// Valores do Timer
const THOUSAND = 1000;
const THIRTY_THOUSAND = 30000;

class Gaming extends React.Component {
  constructor(props) {
    super(props);

    this.verifyAll = this.verifyAll.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.selectedAnswer = this.selectedAnswer.bind(this);
    this.nextQuestionFunction = this.nextQuestionFunction.bind(this);

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
          answer: this.decodeHTMLEntities(correctAnswer),
          testid: 'correct-answer',
          className: 'green-border',
        });

        incorrectAnswers.map((incorrect, index) => NEW_ARRAY_ANSWERS.push({
          answer: this.decodeHTMLEntities(incorrect),
          testid: `wrong-answer-${index}`,
          className: 'red-border',
        }));

        CORRECT_ANSWER = this.decodeHTMLEntities(correctAnswer);

        return this.shuffleAnswers(NEW_ARRAY_ANSWERS);
      }

      return NEW_ARRAY_ANSWERS;
    }
  }

  // Embaralahndo as perguntas
  // https://stackoverflow.com/questions/49555273/how-to-shuffle-an-array-of-objects-in-javascript
  shuffleAnswers(array) {
    const sizeArray = array.length;
    for (let i = 0; i < sizeArray; i += 1) {
      const random = Math.floor(Math.random() * sizeArray);
      [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
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

  // Função que interpreta caracteres especiais
  // https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5
  decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  selectedAnswer(event) {
    const { currentCount } = this.state;
    const buttonText = event ? event.target.innerText : '';

    clearInterval(this.setTimer);
    clearTimeout(this.disabledButtons);
    this.setState({ isDisabled: true });

    if (currentCount > 0 && CORRECT_ANSWER === buttonText) {
      // this.resultsPointPlayer();
    }
  }

  nextQuestionFunction() {
    const {
      questionNumber,
      nextQuestionDispatch,
    } = this.props;
    const maxQuestionNumber = 4;
    NEW_ARRAY_ANSWERS = [];

    if (questionNumber < maxQuestionNumber) {
      const next = questionNumber + 1;

      this.setState(INITIAL_STATE);
      nextQuestionDispatch(next);
    } else {
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
              {this.decodeHTMLEntities(questionsState[questionNumber].question)}
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
});

const mapStateToProps = (state) => ({
  questionsState: state.questionsReducer.questions,
  questionNumber: state.questionsReducer.questionNumber,
  responseCode: state.questionsReducer.responseCode,
});

Gaming.propTypes = {
  questionDispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Gaming);
