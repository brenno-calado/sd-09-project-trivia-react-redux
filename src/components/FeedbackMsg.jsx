import React from 'react';
import { number } from 'prop-types';
import { connect } from 'react-redux';

class FeedbackMsg extends React.Component {
  verifyNumberOfPoints() {
    const { pointCounter } = this.props;
    const three = 3;
    if (pointCounter >= three) {
      return 'Mandou bem!';
    }
    return 'Podia ser melhor...';
  }

  render() {
    return (
      <div>
        <p data-testid="feedback-text">
          {
            this.verifyNumberOfPoints()
          }
        </p>
      </div>
    );
  }
}

FeedbackMsg.propTypes = {
  pointCounter: number,
}.isRequired;

const mapStateToProps = (state) => ({
  pointCounter: state.scoreReducer.assertions,
});

export default connect(mapStateToProps)(FeedbackMsg);
