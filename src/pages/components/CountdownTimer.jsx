import '../css/timer.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// O componente do contador foi feito com base no código visto neste link:
// https://codesandbox.io/s/vigilant-wildflower-3yvux?file=/src/index.js
// Buscamos fazê-lo utilizando o estado global pois parecia ser mais simples de
// controlar, não só o timer em si, mas também os estados dos botões de uma só vez.

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
