import '../css/timer.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CountdownTimer extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <div className="timer">
        {timer}
      </div>
    );
  }
}

CountdownTimer.propTypes = {
  // wasAnswered: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = ((state) => ({
  wasAnswered: state.timer.wasAnswered,
  timer: state.timer.timer,
}));

export default connect(mapStateToProps)(CountdownTimer);
