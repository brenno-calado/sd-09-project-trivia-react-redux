import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';
import Logotipo from './Logotipo';
import Question from './Question';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      questionIndex: 0,
    };
    this.showNextQuestionButton = this.showNextQuestionButton.bind(this);
    this.handleAnsweredQuestion = this.handleAnsweredQuestion.bind(this);
    this.showNextQuestion = this.showNextQuestion.bind(this);
  }

  handleAnsweredQuestion() {
    this.setState({ clicked: true });
  }

  showNextQuestion() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    if (questionIndex < questions.length - 1) {
      this.setState((prevState) => (
        { questionIndex: prevState.questionIndex + 1, clicked: false }
      ));
    }
  }

  showNextQuestionButton() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    return questionIndex === questions.length - 1
      ? (
        <Link to="/feedback">
          <button type="button" data-testid="btn-next" onClick={ this.showNextQuestion }>
            Próxima
          </button>
        </Link>
      )
      : (
        <button type="button" data-testid="btn-next" onClick={ this.showNextQuestion }>
          Próxima
        </button>
      );
  }

  render() {
    const { questions } = this.props;
    const { clicked, questionIndex } = this.state;

    return (
      <div>
        {
          !questions.length
            ? <Logotipo />
            : (
              <main className="container-game">
                {
                  [questions[questionIndex]].map((question, index) => (
                    <Question
                      data={ question }
                      key={ index }
                      onAnsweredQuestion={ this.handleAnsweredQuestion }
                    />
                  ))
                }
                { clicked && this.showNextQuestionButton() }
              </main>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

Questions.propTypes = {
  questions: arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(Questions);
