import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timer, isDisabled } from '../actions';
import './Timer.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.startCounterTime = this.startCounterTime.bind(this);
    this.decrementCounterTime = this.decrementCounterTime.bind(this);
  }

  componentDidMount() {
    this.startCounterTime();
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  decrementCounterTime() {
    const { sendTime, disabled, counter } = this.props;
    if (counter === 1) {
      clearInterval(this.timerInterval);
      sendTime(0);
      disabled(true);
    } else {
      const newTime = counter - 1;
      sendTime(newTime);
    }
  }

  startCounterTime() {
    const oneSecond = 1000;
    this.timerInterval = setInterval(this.decrementCounterTime, oneSecond);
  }

  render() {
    const { counter } = this.props;
    return (
      <section className="timer-container">
        { `Tempo: ${counter}` }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.triviaReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  sendTime: (time) => dispatch(timer(time)),
  disabled: (bool) => dispatch(isDisabled(bool)),
});

Timer.propTypes = {
  sendTime: PropTypes.func.isRequired,
  disabled: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
