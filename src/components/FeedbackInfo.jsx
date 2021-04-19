import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

class FeedbackInfo extends Component {
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
});

FeedbackInfo.propTypes = {
  score: number,
  assertions: number,
}.isRequired;

export default connect(mapStateToProps)(FeedbackInfo);
