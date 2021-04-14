import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeCounter } from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 30,
    };
    this.timerCaller = this.timerCaller.bind(this);
    this.checkCounter = this.checkCounter.bind(this);
  }

  componentDidMount() {
    this.timerCaller();
  }

  componentDidUpdate() {
    this.checkCounter();
    const { getCounter, counter } = this.props;
    getCounter(counter);
  }

  checkCounter() {
    const { count } = this.state;
    if (count === 0) clearInterval(this.myInterval);
  }

  timerCaller() {
    const interval = 1000;
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }, interval);
  }

  render() {
    const { count } = this.state;
    const { getCounter } = this.props;
    getCounter(count);
    return (
      <div>
        <span className="counter">{ count }</span>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  counter: state.player.counter,
});

const mapDispatchToProps = (dispatch) => ({
  getCounter: (counter) => dispatch(timeCounter(counter)),
});

Timer.propTypes = {
  getCounter: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Timer);
