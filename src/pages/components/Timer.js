import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdTimer } from 'react-icons/md';
import { getSeconds, removeRestartTimer, timesUp } from '../../redux/actions';
import '../../styles/components/Timer.css';

let timer;
class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.gameTimer = this.gameTimer.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
  }

  componentDidMount() {
    const { startTimer } = this.props;
    if (startTimer) {
      this.gameTimer();
    }
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { dispatchTimesUp, stopTime, restartTimer } = this.props;
    if (restartTimer) {
      this.restartTimer();
    } else if ((seconds > 0) && (!(stopTime))) {
      this.gameTimer();
    } else if (((seconds === 0) || (stopTime))) {
      clearTimeout(timer);
      dispatchTimesUp();
    }
  }

  gameTimer() {
    const { seconds } = this.state;
    const { dispatchSeconds } = this.props;
    const ONE_SECOND = 1000;
    timer = setTimeout(() => this.setState({ seconds: seconds - 1 }), ONE_SECOND);
    dispatchSeconds(seconds);
  }

  restartTimer() {
    const { dispatchRemoveRestartTimer } = this.props;
    this.setState({
      seconds: 30,
    });
    dispatchRemoveRestartTimer();
  }

  render() {
    const { seconds } = this.state;
    return (
      <div className="timer-container">
        <MdTimer />
        <span>
          {seconds}
          s
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTimesUp: () => dispatch(timesUp()),
  dispatchSeconds: (seconds) => dispatch(getSeconds(seconds)),
  dispatchRemoveRestartTimer: () => dispatch(removeRestartTimer()),
});

const mapStateToProps = (state) => ({
  stopTime: state.timer.stopTime,
  restartTimer: state.timer.restartTimer,
  startTimer: state.timer.startTimer,
});

Timer.propTypes = {
  dispatchTimesUp: PropTypes.func,
  dispatchSeconds: PropTypes.func,
  stopTime: PropTypes.bool,
  restartTimer: PropTypes.bool,
  startTimer: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
