import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchApi } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { questionFetch } = this.props;
    questionFetch();
  }

  render() {
    const { results } = this.props;
    // console.log(results);
    console.log(results !== '' ? results[0].category : 0);
    return (
      <div>
        <Header />
        <div className="container-game">
          <div>
            <div data-testid="question-category">
              { results !== '' ? results[0].category : 0}
            </div>
            <div data-testid="question-text">
              { results !== '' ? results[0].question : 0}
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn"
              data-testid="correct-answer"
            >
              { results !== '' ? results[0].correct_answer : 0}
            </button>
            { results !== '' ? results[0].incorrect_answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                className="btn"
                data-testid={ `wrong-answer-${index}` }
              >
                {answer}
              </button>
            ))
              : 0}
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
