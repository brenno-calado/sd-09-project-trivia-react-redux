import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';
import Logotipo from './Logotipo';
import Question from './Question';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.showNextQuestionButton = this.showNextQuestionButton.bind(this);
  }

  showNextQuestionButton() {
    return (
      <button type="button" data-testid="btn-next">
        Próxima
      </button>
    );
  }

  render() {
    const { questions } = this.props;
    const { clicked } = this.state;

    return (
      <div>
        {
          !questions.length
            ? <Logotipo />
            : (
              <main className="container-game">
                {
                  [questions[0]].map((question, index) => (
                    <Question data={ question } key={ index } />
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
