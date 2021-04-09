import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import getQuestionsApiAction from '../redux/Actions/getRequestQuestionsApiAction';
import Header from '../components/Header';
import NextQuestionButton from '../components/NextQuestionButton';
import Timer from '../components/Timer';
import AnswersButton from '../components/AnswersButton';
import '../styles/styleButonsAnswers.css';

class ScreenGame extends React.Component {
  constructor(props) {
    super(props);
    const { userName, userEmail } = props;

    this.state = {
      correct: '',
      allAnswers: [],
      showNextQuestion: false,
      difficulty: '',
      player: {
        name: userName,
        assertions: 0,
        score: 0,
        gravatarEmail: userEmail,
      },
      category: '',
      question: '',
      timer: 30,
      changeClass: false,
      indexQuestion: 0,
      redirectToFeedback: false,
    };

    this.updateState = this.updateState.bind(this);
    this.changeClassAnswer = this.changeClassAnswer.bind(this);
    this.changeClassCorrectAnswer = this.changeClassCorrectAnswer.bind(this);
    this.addScore = this.addScore.bind(this);
    this.difficultScore = this.difficultScore.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.setIndexQuestion = this.setIndexQuestion.bind(this);
    this.setSettingsRedirect = this.setSettingsRedirect.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    const token = localStorage.getItem('token');
    getQuestions(token);
    const { player } = this.state;
    localStorage.setItem('state', JSON.stringify(player));
  }

  componentDidUpdate(props) {
    if (props !== this.props) {
      this.setIndexQuestion();
      this.addScore();
    }
  }

  setIndexQuestion() {
    const { indexQuestion } = this.state;
    const five = 5;
    if (indexQuestion < five) {
      this.setState((prevState) => ({
        indexQuestion: prevState.indexQuestion + 1,
        showNextQuestion: false,
        changeClass: false,
      }));
      const { questions } = this.props;
      const { results } = questions;
      const { difficulty, category, question } = results[indexQuestion];
      const correctAnswer = results[indexQuestion].correct_answer;
      const incorrectAnswer = results[indexQuestion].incorrect_answers
        .map((answer) => answer);
      const concatAllAnswers = [...incorrectAnswer, correctAnswer];
      const mixTheAnswers = concatAllAnswers
        .map((asnwer) => ({ sort: Math.random(), value: asnwer }))
        .sort((a, b) => a.sort - b.sort).map((answer) => answer.value);
      const objQuestions = {
        correct: correctAnswer,
        allAnswers: mixTheAnswers,
        category,
        question,
        difficulty,
      };
      this.updateState(objQuestions);
    }
  }

  setSettingsRedirect() {
    const { indexQuestion } = this.state;
    const four = 4;
    if (indexQuestion > four) {
      this.setState({ redirectToFeedback: true });
    }
  }

  updateState(objQuestions) {
    const { correct, allAnswers, category, question, difficulty } = objQuestions;
    this.setState({
      correct,
      allAnswers,
      category,
      question,
      difficulty,
    });
  }

  difficultScore(difficulty) {
    const three = 3;
    switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    default:
      return three;
    }
  }

  addScore() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { timer, difficulty, player } = this.state;
    const correctAnswer = 10;
    const difficultyScore = this.difficultScore(difficulty);

    const calculateScore = (
      correctAnswer + (timer * difficultyScore) + getLocalStorage.score
    );

    const { userName, userEmail } = this.props;
    this.setState(({ player: { score, assertions } }) => ({
      player: {
        name: userName,
        assertions: assertions + 1,
        score: score + calculateScore,
        gravatarEmail: userEmail,
      },
    }));

    localStorage.setItem('state', JSON.stringify({ player }));
  }

  changeClassAnswer() {
    this.setState({
      changeClass: true,
    });
  }

  changeClassCorrectAnswer() {
    this.setState({
      changeClass: true,
    });

    this.addScore();
  }

  submitAnswer() {
    this.setState({
      showNextQuestion: true,
    });
  }

  render() {
    const { correct, allAnswers, redirectToFeedback,
      category, question, changeClass, showNextQuestion } = this.state;
    const { btnState } = this.props;
    if (redirectToFeedback) return <Redirect to="feedback" />;
    return (
      <section>
        <Header />
        <div>
          <h3 data-testid="question-category">{category}</h3>
          <p data-testid="question-text">{question}</p>
        </div>
        <AnswersButton
          changeClassCorrectAnswer={ () => {
            this.changeClassCorrectAnswer(); this.submitAnswer();
          } }
          changeClassAnswer={ () => {
            this.changeClassAnswer(); this.submitAnswer();
          } }
          btnState={ btnState }
          changeClass={ changeClass }
          correct={ correct }
          allAnswers={ allAnswers }
        />
        { showNextQuestion
          && <NextQuestionButton
            setIndexQuestion={
              () => { this.setIndexQuestion(); this.setSettingsRedirect(); }
            }
          /> }
        <Timer />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch((getQuestionsApiAction(token))),
});

const mapStateToProps = (state) => ({
  userName: state.loginReducer.userName,
  userEmail: state.loginReducer.userEmail,
  questions: state.questionsReducer.questions,
  btnState: state.btnState.btnState,
});

ScreenGame.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape().isRequired,
  btnState: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);
