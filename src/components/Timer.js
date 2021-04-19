import React from 'react';
import PropTypes from 'prop-types';
import style from './Timer.module.css';

class Timer extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <div className={ style.div }>
        <progress className={ style.progress } max="30" value={ timer } />
        <h2 className={ style.timer }>{timer}</h2>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default Timer;
