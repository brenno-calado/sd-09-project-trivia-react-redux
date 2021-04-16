import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import TriviaCardsBA from '../Components/TriviaCardsBA';
import TriviaCardsMA from '../Components/TriviaCardsMA';
import './answers.css';
import Feedback from './Feedback';
import './trivia.css';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update() {
    const { questions } = this.props;
    if (questions) {
      const { questIndex } = this.props;
      const i = parseInt(questIndex, 10);
      const quest = questions[i];
      return (Array(quest)).map((question) => (
        (question.type === 'multiple')
          ? <TriviaCardsMA question={ question } />
          : <TriviaCardsBA question={ question } />
      ));
    }
  }

  render() {
    const { questIndex, questions } = this.props;
    const quatro = 4;
    if (questions && questions.length === 0) {
      return <Redirect to="/" />;
    }
    if (questIndex > quatro) {
      return <Feedback />;
    }
    return (
      <div className="trivia">
        <Header />
        <div className="triviaCards">
          { this.update() }
        </div>
      </div>
    );
  }
}

Trivia.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  questIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
  questIndex: game.index,
});

export default connect(mapStateToProps)(Trivia);
