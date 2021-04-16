import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackContent extends React.Component {
  render() {
    const { assertions } = this.props;
    const THREE = 3;

    return assertions < THREE ? (
      <h4 data-testid="feedback-text">Podia ser melhor...</h4>
    ) : (
      <h4 data-testid="feedback-text">Mandou bem!</h4>
    );
  }
}

FeedbackContent.propTypes = {
  assertions: PropTypes.number,
};

FeedbackContent.defaultProps = {
  assertions: PropTypes.number,
};

const mapStateToProps = ({ player: { assertions } }) => ({
  assertions,
});

export default connect(mapStateToProps)(FeedbackContent);
