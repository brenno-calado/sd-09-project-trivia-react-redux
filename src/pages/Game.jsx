import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchApi, scoreFunction } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.decodeHTML = this.decodeHTML.bind(this);
    this.state = {
      counter: 0,
      stop: false,
      timer: 30,
      randomNumber: 0,
    };
  }

  componentDidMount() {
    this.random();
    const { questionFetch } = this.props;
    const miliseconds = 1000;
    questionFetch();
    this.timerID = setInterval(() => this.timerFunction(), miliseconds);
  }

  timerFunction() {
    const { timer, stop } = this.state;
    if (timer > 0 && !stop) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      this.setState({ stop: true });
    }
  }

  decodeHTML(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  nextQuestion() {
    const { counter } = this.state;
    this.setState({
      stop: false,
      counter: counter + 1,
      timer: 30,
    });
    this.random();
  }

  random() {
    const four = 4;
    this.setState({
      randomNumber: Math.floor(Math.random() * (four - 0)) + 0,
    });
  }

  shuffle(array) {
    const { randomNumber } = this.state;
    [array[0], array[randomNumber]] = [array[randomNumber], array[0]];
    return array;
  }

  renderQuestions() {
    const { results, scoreSum } = this.props;
    const { counter, timer, stop } = this.state;
    return (
      <div>
        <div className="container-game">
          <div>
            <div data-testid="question-category">
              CATEGORIA[
              { this.decodeHTML(results[counter].category) }
              ]
            </div>
            <br />
            PERGUNTA:
            <div data-testid="question-text">
              { this.decodeHTML(results[counter].question) }
            </div>
          </div>
          <div className="buttons">
            { this.shuffle([(
              <button
                key="correct"
                style={ { border: `${stop ? '3' : '0'}px solid rgb(6, 240, 15)` } }
                type="button"
                className="btn"
                data-testid="correct-answer"
                onClick={
                  () => { scoreSum(timer, counter); this.setState({ stop: true }); }
                }
                disabled={ stop }
              >
                { this.decodeHTML(results[counter].correct_answer) }
              </button>),
            ...results[counter].incorrect_answers.map((answer, index) => (
              <button
                key={ `incorrect-${index}` }
                style={ { border: `${stop ? '3' : '0'}px solid rgb(255, 0, 0)` } }
                type="button"
                className="btn"
                data-testid={ `wrong-answer-${index}` }
                onClick={ () => { this.setState({ stop: true }); } }
                disabled={ stop }
              >
                { this.decodeHTML(answer) }
              </button>))])}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { score, assertions, isFetching } = this.props;
    const { counter, timer, stop } = this.state;
    const five = 5;
    localStorage.setItem('state', JSON.stringify({ player: { score, assertions } }));
    if (counter === five) {
      return <Redirect to="/feedback" />;
    }
    if (isFetching) {
      return <div className="container-game loading">CARREGANDO...</div>;
    }
    return (
      <div>
        <Header />
        <div>
          <div className="timer">
            { timer > 0 ? `TEMPO: ${timer}s` : 'TEMPO ESGOTADO'}
          </div>
          {this.renderQuestions()}
          <div className="nextbutton">
            <button
              type="button"
              className="btn next"
              data-testid="btn-next"
              style={ stop ? { display: 'block' } : { display: 'none' } }
              onClick={ this.nextQuestion }
            >
              PRÓXIMA
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
  score: PropTypes.number.isRequired,
  scoreSum: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  results: state.game.results,
  isFetching: state.game.isFetching,
  score: state.game.gameBoard.score,
  assertions: state.game.gameBoard.assertions,
});
const mapDispatchToProps = (dispatch) => ({
  questionFetch: () => dispatch(fetchApi()),
  scoreSum: (timer, counter) => dispatch(scoreFunction(timer, counter)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
