import React, { Component } from 'react';
import { number, string } from 'prop-types';

import './Answer.css';

class Answer extends Component {
  render() {
    const { text, dataTestId, isClicked, onHandleClick, timer, disabled } = this.props;
    const isTimeOver = timer < 0;

    return (
      <button
        type="button"
        className={ isClicked }
        data-testid={ dataTestId }
        onClick={ onHandleClick }
        disabled={ isTimeOver || disabled }
      >
        { text }
      </button>
    );
  }
}

Answer.propTypes = {
  item: string,
  index: number,
}.isRequired;

export default Answer;
