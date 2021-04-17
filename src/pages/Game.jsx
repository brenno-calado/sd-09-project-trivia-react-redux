import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchApi } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.firstClick = this.firstClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.decodeHTMLEntities = this.decodeHTMLEntities.bind(this);
    this.timer = this.timer.bind(this);
    this.state = {
      nextButton: 'none',
      counter: 0,
      answers: '',
      time: 30,
      intervalConst: 0,
      disableAnwsers: false,
    };
  }

  async componentDidMount() {
    const { questionFetch } = this.props;
    await questionFetch();
    this.getAnswers();
    this.timer();
  }

  getAnswers() {
    const { results } = this.props;
    const { counter } = this.state;
    const correctAnswer = {
      correct: 'correct-answer',
      result: results[counter].correct_answer,
    };
    const incorrectAnswers = results[counter].incorrect_answers.map((e, index) => ({
      correct: `wrong-answer-${index}`,
      result: e,
    }));
    const answers = [correctAnswer, ...incorrectAnswers];
    this.shuffle(answers);
    this.setState({ answers });
  }

  decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  firstClick() {
    this.setState({
      nextButton: 'block',
    });
  }

  async nextQuestion() {
    const { counter } = this.state;
    await this.setState({
      counter: counter + 1,
      nextButton: 'none',
    });
    const { intervalConst } = this.state;
    clearInterval(intervalConst);
    this.getAnswers();
    this.timer();
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  timer() {
    const oneSecond = 1000;
    const intervalConst = setInterval(() => {
      const { time } = this.state;
      console.log(time);
      this.setState(() => ({
        time: time - 1,
      }),
      () => {
        if (time <= 1) {
          console.log('time out');
          this.setState({
            disableAnwsers: true,
          });
          clearInterval(intervalConst);
        }
      });
    }, oneSecond);
  }

  render() {
    const { results } = this.props;
    const { nextButton, counter, answers, time, disableAnwsers } = this.state;
    console.log(results !== '' ? results[counter].category : 0);
    return (
      <div>
        <Header />
        <div className="container-game">
          <div>
            CATEGORIA:
            <div data-testid="question-category">
              { results !== '' ? this.decodeHTMLEntities(results[counter].category) : ''}
            </div>
            <br />
            PERGUNTA:
            <div data-testid="question-text">
              { results !== '' ? this.decodeHTMLEntities(results[counter].question) : ''}
            </div>
            <div className="timer">
              Tempo:
              { time }
            </div>
          </div>
          <div className="buttons">
            { answers !== '' ? answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                className="btn"
                data-testid={ answer.correct }
                onClick={ this.firstClick }
                disabled={ disableAnwsers }
              >
                { this.decodeHTMLEntities(answer.result) }
              </button>
            )) : '' }
          </div>
          <div className="nextbutton">
            <button
              type="button"
              className="btn next"
              data-testid="btn-next"
              style={ { display: nextButton } }
              onClick={ this.nextQuestion }
              disabled={ disableAnwsers }
            >
              Próxima
            </button>

          </div>
        </div>
      </div>

    );
  }
}

Game.propTypes = {
  questionFetch: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  results: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  questionFetch: () => dispatch(fetchApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
