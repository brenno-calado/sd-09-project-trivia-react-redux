import React, { Component } from 'react';
import { connect } from 'react-redux';
import {incrementScore } from '../redux/actions/index';
import Header from '../components/Header';
import * as api from '../services/fetchApi';

class InfoGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      indice: 0,
      isLoading: true,
      isAnswered: false,
    };
    this.requestAPI = this.requestAPI.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
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
    this.setState((prevState) => ({ indice: prevState.indice + 1 }));
    this.setState({ isAnswered: false });
  }

  requestAPI() {
    const token = JSON.parse(localStorage.getItem('token'));
    const quantityQuestions = 5;
    api.fetchTrivia(token, quantityQuestions).then((responseRequest) => (
      this.setState({
        questions: responseRequest.results,
        isLoading: false,
      })));
  }

  renderQuestions() {
    const { questions, indice, isAnswered } = this.state;
    const crrQuestion = questions[indice];
    const alternativesOld = crrQuestion.incorrect_answers
      .concat(crrQuestion.correct_answer);
    const numberMagic = 0.5;
    const alternatives = alternativesOld.sort(() => Math.random() - numberMagic);
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">
          {crrQuestion.category}
        </h1>
        <h2 data-testid="question-text">{crrQuestion.question}</h2>
        {alternatives.map((alternative, index) => (
          <button
            key={ Math.random() }
            type="button"
            onClick={
              event => this.checkAnswer(crrQuestion.correct_answer, event)
            }
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
          className={isAnswered ? 'visible' : 'invisible' }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const { isLoading, indice } = this.state;
    const nLimite = 4;
    return (
      isLoading || indice > nLimite ? <p>Loading...</p> : this.renderQuestions()
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchIncrementScore: (localScore) => dispatch(incrementScore(localScore)) });

export default connect(null, mapDispatchToProps)(InfoGames);
