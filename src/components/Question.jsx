import React, { Component } from 'react';
import { shape, string, arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';
import he from 'he';
import Answer from './Answer';
import { handleAssertion } from '../actions';
import scoreTable from '../helpers/scoreTable';

class Question extends Component {
  constructor(props) {
    super(props);

    const {
      data: {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer,
      },
    } = this.props;

    this.state = {
      clicked: false,
      answers: [...incorrectAnswers, correctAnswer],
      shuffledAnswers: this.shuffleAnswers([...incorrectAnswers, correctAnswer]),
      timer: 30,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const milliseconds = 1000;
    this.interval = setInterval(() => this.tick(), milliseconds);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick(e) {
    const { innerText } = e.target;
    const { sumScore, data: { difficulty }, onAnsweredQuestion } = this.props;
    const { answers, timer } = this.state;
    clearInterval(this.interval);
    this.setState(
      { clicked: true },
      () => {
        if (answers.indexOf(innerText) === answers.length - 1) {
          sumScore(timer, scoreTable[difficulty]);
        }
        onAnsweredQuestion();
      },
    );
  }

  tick() {
    this.setState((state) => ({
      timer: state.timer - 1,
    }));
  }

  shuffleAnswers(array) {
    const shuffled = array.slice().reverse();
    shuffled.forEach((item, index, arr) => {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      arr[index] = arr[randomIndex];
      arr[randomIndex] = item;
    });
    return shuffled;
  }

  renderAnswers() {
    const { clicked, answers, shuffledAnswers, timer } = this.state;
    return shuffledAnswers.map((answer) => (
      answers.indexOf(answer) === answers.length - 1
        ? (
          <Answer
            key={ answer }
            text={ he.decode(answer) }
            dataTestId="correct-answer"
            isClicked={ clicked ? 'yes' : '' }
            timer={ timer }
            onHandleClick={ this.handleClick }
            disabled={ clicked }
          />
        )
        : (
          <Answer
            key={ answer }
            text={ he.decode(answer) }
            dataTestId={ `wrong-answer-${answers.indexOf(answer)}` }
            isClicked={ clicked ? 'no' : '' }
            timer={ timer }
            onHandleClick={ this.handleClick }
            disabled={ clicked }
          />
        )
    ));
  }

  render() {
    const { data: { category, question } } = this.props;
    const { timer } = this.state;
    return (
      <>
        <section className="question-game">
          <h2 data-testid="question-category">{ category }</h2>
          <p data-testid="question-text">{ he.decode(question) }</p>
          { this.renderAnswers() }
        </section>
        <div>
          {timer > 0 ? <p>{ timer }</p> : <p>0</p>}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sumScore: (timer, difficulty) => dispatch(handleAssertion(timer, difficulty)),
});

Question.propTypes = {
  data: shape({
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }),
  sumScore: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Question);
