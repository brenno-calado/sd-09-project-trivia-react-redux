import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { timer } from '../actions';
import Header from '../components/Header';
import Timer from '../components/Timer';
import '../styles/Play.css';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      addClass: false,
      randomized: [],
      isButtonsRandomized: false,
      questionLevel: '',
      nextQuestion: false,
      redirectFeedBack: false,
    };
    this.handleAnswers = this.handleAnswers.bind(this);
    this.toggle = this.toggle.bind(this);
    this.questionGenerator = this.questionGenerator.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
    this.handleClickSuccess = this.handleClickSuccess.bind(this);
    this.handleClickFailure = this.handleClickFailure.bind(this);
    this.nextQuestionButtonGenerator = this.nextQuestionButtonGenerator.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.updateRanking = this.updateRanking.bind(this);
  }

  toggle() {
    const { addClass } = this.state;
    this.setState({ addClass: !addClass });
  }

  handleClickSuccess() {
    this.toggle();
    this.scoreCalculator();
    this.setState({ nextQuestion: true });
  }

  handleClickFailure() {
    this.toggle();
    this.setState({ nextQuestion: true });
  }

  updateRanking() {
    const currentPlayer = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail } = currentPlayer;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const hash = md5(gravatarEmail).toString();
    currentPlayer.player.gravatarEmail = `https://www.gravatar.com/avatar/${hash}`;
    ranking.push(currentPlayer.player);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  handleNextQuestion() {
    const { questionIndex } = this.state;
    const { questions, sendTime } = this.props;
    const restartTime = 30;
    if (questionIndex === questions.length - 1) {
      this.updateRanking();
      this.setState({ redirectFeedBack: true });
    } else {
      this.setState({
        questionIndex: questionIndex + 1,
        isButtonsRandomized: false,
        nextQuestion: false,
        addClass: false,
      });
      sendTime(restartTime);
    }
  }

  nextQuestionButtonGenerator() {
    return (
      <section className="next-button">
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleNextQuestion }
        >
          Próxima
        </button>
      </section>
    );
  }

  scoreCalculator() {
    const { questionLevel } = this.state;
    const { counter } = this.props;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const magicNumber = 10;
    const previousStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = previousStorage;
    console.log(previousStorage);
    switch (questionLevel) {
    case questionLevel === 'hard':
      previousStorage.player.score = score + (magicNumber + (counter * hard));
      previousStorage.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(previousStorage));
      break;
    case questionLevel === 'medium':
      previousStorage.player.score = score + (magicNumber + (counter * medium));
      previousStorage.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(previousStorage));
      break;
    default:
      previousStorage.player.score = score + (magicNumber + (counter * easy));
      previousStorage.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(previousStorage));
      break;
    }
  }

  questionGenerator() {
    const { addClass, randomized, isButtonsRandomized, questionIndex } = this.state;
    const { isDisabled, questions } = this.props;
    const currentQuestion = questions[questionIndex];
    const { category, question } = currentQuestion;
    if (!isButtonsRandomized) {
      const randomizedAnswers = this.handleAnswers();
      this.setState({ randomized: randomizedAnswers });
    }
    return (
      <section className="question-container">
        <div>
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
        </div>
        {
          randomized.map(({ isTrue, answer }, index) => {
            if (!isTrue) {
              return (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  className={ addClass ? 'fail' : 'riddle' }
                  onClick={ this.handleClickFailure }
                  disabled={ isDisabled }
                >
                  { answer }
                </button>
              );
            }
            return (
              <button
                type="button"
                key={ index }
                data-testid="correct-answer"
                className={ addClass ? 'success' : 'riddle' }
                onClick={ this.handleClickSuccess }
                disabled={ isDisabled }
              >
                { answer }
              </button>
            );
          })
        }
      </section>
    );
  }

  handleAnswers() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    let currentQuestion;
    if (questions) {
      currentQuestion = questions[questionIndex];
    }
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      difficulty,
    } = currentQuestion;
    this.setState({ questionLevel: difficulty });
    const correct = {
      isTrue: true,
      answer: correctAnswer,
    };
    const wrongAnswer = incorrectAnswers.map((answer) => ({
      isTrue: false,
      answer,
    }));
    const fakeNumber = 0.5;
    const answersButtons = [correct, ...wrongAnswer];
    const randomizedAnswers = answersButtons.sort(() => fakeNumber - Math.random());
    this.setState({ isButtonsRandomized: true });
    return randomizedAnswers;
  }

  render() {
    const { isFetching, questions } = this.props;
    const { nextQuestion } = this.state;
    const { redirectFeedBack } = this.state;
    if (redirectFeedBack) return <Redirect to="/feedback" />;
    if (isFetching) return <div>Loading...</div>;
    return (
      <main className="main-container">
        <Header />
        { !isFetching && questions.length > 0 && this.questionGenerator() }
        { nextQuestion && this.nextQuestionButtonGenerator() }
        <Timer />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
  isFetching: state.triviaReducer.isFetching,
  isDisabled: state.triviaReducer.isDisabled,
  counter: state.triviaReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  sendTime: (time) => dispatch(timer(time)),
});

Play.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  sendTime: PropTypes.func.isRequired,
};

Play.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
