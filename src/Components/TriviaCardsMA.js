import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { rightAnswers, updateIndex, wrongAnswers, playerScore } from '../redux/actions';
import Timer from './timer';
import CORRECT from './correct';
import './triviaCard.css';

class MultipleAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightAnswerClass: '',
      wrongAnswerClass: '',
      nextButton: true,
      correctAnswer: CORRECT,
      btnDisplayed: false,
      btnDisabled: false,
      show: true,
    };
    this.validateAnswers = this.validateAnswers.bind(this);
    this.updateQuestIndex = this.updateQuestIndex.bind(this);
    this.answerCheck = this.answerCheck.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.createNextBtn = this.createNextBtn.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  componentDidUpdate() {
    this.updateLocalStorage();
    this.endTime();
  }

  updateLocalStorage() {
    const { player } = this.props;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  endTime() {
    const finalTime = 30000;
    setTimeout(() => {
      this.setState({
        nextButton: false,
        btnDisplayed: true,
        btnDisabled: true,
        show: false,
      });
    }, finalTime);
  }

  updateQuestIndex() {
    const { questIndex, dispatchIndex } = this.props;
    let newIndex = questIndex;
    newIndex += 1;
    dispatchIndex(newIndex);
  }

  validateAnswers(answer, index) {
    const { question } = this.props;
    if (question.correct_answer !== answer) {
      return `wrong-answer-${index}`;
    }
    return CORRECT;
  }

  answerCheck(e) {
    const {
      dispatchCorrect, dispatchWrong, question, counter, dispatchScore,
    } = this.props;
    const { target } = e;
    const answer = target.innerText;
    const correct = 10;
    const types = { easy: 1, medium: 2, hard: 3 };
    this.setState({
      nextButton: false,
      rightAnswerClass: 'rightAnswer',
      wrongAnswerClass: 'wrongAnswer',
      btnDisplayed: true,
      btnDisabled: true,
      show: false,
    });
    if (this.validateAnswers(answer) === CORRECT) {
      dispatchCorrect(1);
      switch (question.difficulty) {
      case 'hard':
        return (dispatchScore(correct + (counter * types.hard)));
      case 'medium':
        return (dispatchScore(correct + (counter * types.medium)));
      default:
        return (dispatchScore(correct + (counter * types.easy)));
      }
    } else { dispatchWrong(1); }
  }

  nextQuestion() {
    this.updateQuestIndex();
    // this.createChoices();
    this.endTime();
    this.setState({ rightAnswerClass: '',
      wrongAnswerClass: '',
      nextButton: true,
      btnDisplayed: false,
      btnDisabled: false,
      show: true,
    });
  }

  createNextBtn(click, state) {
    return (
      <button
        className="next"
        data-testid="btn-next"
        type="button"
        onClick={ click }
        disabled={ state }
      >
        <AiOutlineDoubleRight />
      </button>
    );
  }

  renderTimer() {
    return <Timer />;
  }

  render() {
    const {
      rightAnswerClass,
      wrongAnswerClass,
      nextButton,
      correctAnswer,
      btnDisplayed,
      btnDisabled,
      show,
    } = this.state;
    const { question } = this.props;
    const choice = [...question.incorrect_answers, question.correct_answer];
    let index = 0;
    return (
      <div className="triviaCard">
        <h3 className="category" data-testid="question-category">
          { this.decodeHtml(question.category) }
        </h3>
        <p
          className="text"
          data-testid="question-text"
        >
          { this.decodeHtml(question.question) }
        </p>
        <div className="answers">
          {choice.map((answer) => {
            const dataTestId = this.validateAnswers(answer, index);
            if (dataTestId !== correctAnswer) index += 1;
            return (
              <button
                className={ dataTestId === correctAnswer ? rightAnswerClass
                  : wrongAnswerClass }
                type="button"
                key={ answer }
                disabled={ btnDisabled }
                data-testid={ dataTestId }
                onClick={ this.answerCheck }
              >
                { this.decodeHtml(answer) }
              </button>);
          })}
        </div>
        { btnDisplayed ? this.createNextBtn(this.nextQuestion, nextButton)
          : null}
        <div className="timer">
          { show ? this.renderTimer() : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game, player }) => ({
  questIndex: game.index,
  counter: player.counter,
  player: player.player,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchIndex: (index) => dispatch(updateIndex(index)),
  dispatchCorrect: (num) => dispatch(rightAnswers(num)),
  dispatchWrong: (num) => dispatch(wrongAnswers(num)),
  dispatchScore: (score) => dispatch(playerScore(score)),

});

MultipleAnswers.propTypes = {
  counter: PropTypes.number.isRequired,
  questIndex: PropTypes.number.isRequired,
  dispatchIndex: PropTypes.func.isRequired,
  dispatchCorrect: PropTypes.func.isRequired,
  dispatchWrong: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleAnswers);
