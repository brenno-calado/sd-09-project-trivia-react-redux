import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/question';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      nextButton: false,
    };
    this.clickButton = this.clickButton.bind(this);
    this.enableNextButton = this.enableNextButton.bind(this);
  }

  clickButton() {
    let { currentQuestion } = this.state;
    const questionLimit = 4;
    if (currentQuestion < questionLimit) {
      currentQuestion += 1;
      this.setState(() => ({
        currentQuestion,
        nextButton: false,
      }));
    } else {
      const { history: { push } } = this.props;
      push('/feedback');
    }
  }

  enableNextButton() {
    const { nextButton } = this.state;
    if (!nextButton) this.setState({ nextButton: true });
  }

  render() {
    const { currentQuestion, nextButton } = this.state;
    const { questions, loading } = this.props;
    return (
      (loading) ? <p>carregando</p>
        : (
          <div>
            <Header />
            <p>Game Page</p>
            <Question
              questionData={ questions[currentQuestion] }
              key={ currentQuestion }
              enableNextButton={ this.enableNextButton }
            />
            { (nextButton) ? (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.clickButton }
              >
                Próxima
              </button>
            ) : null }
          </div>
        )
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.reducer.loading,
  questions: state.reducer.questions,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
