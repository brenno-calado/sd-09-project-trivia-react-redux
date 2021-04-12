import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { incrementScore } from '../redux/actions/index';
import Header from '../components/Header';
import * as api from '../services/fetchApi';

class InfoGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      alternativeRandom: [],
      indice: 0,
      isLoading: true,
      isAnswered: false,
      endGame: false,
    };
    this.requestAPI = this.requestAPI.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.changeAnswer = this.changeAnswer.bind(this);
    this.randomizeQuestions = this.randomizeQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.requestAPI();
    if (localStorage.getItem('state')) {
      const { dispatchIncrementScore } = this.props;
      const player = JSON.parse(localStorage.getItem('state'));
      const { score } = player;
      dispatchIncrementScore(score);
    }
  }

  checkAnswer(correctAnswer, event) {
    event.preventDefault();
    const { isAnswered } = this.state;
    const { dispatchIncrementScore } = this.props;
    const { target } = event;
    const { innerText: answer } = target;
    if (answer === correctAnswer && !isAnswered) {
      const player = JSON.parse(localStorage.getItem('state'));
      const { assertions, score } = player;
      player.score = score + 1;
      player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(player));
      dispatchIncrementScore(player.score);
    }
    this.setState({ isAnswered: true });
  }

  nextQuestion() {
    this.setState((prevState) => ({ indice: prevState.indice + 1, isAnswered: false }),
      () => {
        const { indice } = this.state;
        const numberOfQuestions = 5;
        if (indice < numberOfQuestions) {
          this.randomizeQuestions();
        } else {
          this.setState({ endGame: true });
        }
      });
  }

  requestAPI() {
    const token = JSON.parse(localStorage.getItem('token'));
    const quantityQuestions = 5;
    api.fetchTrivia(token, quantityQuestions).then((responseRequest) => {
      this.setState({
        questions: responseRequest.results,
        isLoading: false,
      });
      this.randomizeQuestions();
    });
  }

  changeAnswer(alternative, crrQuestion) {
    return alternative === crrQuestion.correct_answer
      ? 'ok' : 'fail';
  }

  randomizeQuestions() {
    const { questions, indice } = this.state;
    const crrQuestion = questions[indice];
    const alternativesOld = crrQuestion.incorrect_answers
      .concat(crrQuestion.correct_answer);
    const numberMagic = 0.5;
    const alternatives = alternativesOld.sort(() => Math.random() - numberMagic);
    this.setState(() => ({
      isAnswered: false,
      alternativeRandom: alternatives,
    }));
  }

  renderQuestions() {
    const { questions, isAnswered, alternativeRandom, indice } = this.state;
    const crrQuestion = questions[indice];
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">
          {crrQuestion.category}
        </h1>
        <h2 data-testid="question-text">{crrQuestion.question}</h2>
        {alternativeRandom.map((alternative, index) => (
          <button
            disabled={ isAnswered }
            key={ Math.random() }
            type="button"
            value={ alternative }
            onClick={
              (event) => this.checkAnswer(crrQuestion.correct_answer, event)
            }
            className={ isAnswered ? this.changeAnswer(alternative, crrQuestion) : null }
            data-testid={ alternative === crrQuestion.correct_answer ? 'correct-answer'
              : `wrong-answer-${index}` }
          >
            {alternative}
          </button>
        ))}
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
          className={ isAnswered ? 'visible' : 'invisible' }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const { isLoading, indice, endGame } = this.state;
    const nLimite = 4;
    const end = <Redirect to="/Feedback" />
    return (
      <div>
        {isLoading || indice > nLimite ? <p>Loading...</p> : this.renderQuestions()}
        {endGame ? end : <span />}
      </div>
    );
  }
}

InfoGames.propTypes = {
  dispatchIncrementScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchIncrementScore: (localScore) => dispatch(incrementScore(localScore)) });

export default connect(null, mapDispatchToProps)(InfoGames);
