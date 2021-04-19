import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number, string } from 'prop-types';

class FeedbackInfo extends Component {
  componentDidMount() {
    const { score, assertions, name } = this.props;
    const playerData = { name, score, assertions };
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    localStorage.setItem('ranking', JSON.stringify([...ranking, playerData]));
  }

  render() {
    const { score, assertions } = this.props;

    return (
      <>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.scoreReducer.score,
  assertions: state.scoreReducer.assertions,
  name: state.loginReducer.name,
});

FeedbackInfo.propTypes = {
  score: number,
  assertions: number,
  name: string,
}.isRequired;

export default connect(mapStateToProps)(FeedbackInfo);
