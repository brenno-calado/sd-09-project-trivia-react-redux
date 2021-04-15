import { WAS_ANSWERED, START_TIMER, RESET_TIMER, TICK } from '../actions';

const INITIAL_STATE = {
  wasAnswered: true,
  timer: 30,
  timerId: null,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WAS_ANSWERED:
    return {
      ...state,
      wasAnswered: true,
    };
  case START_TIMER:
    return {
      ...state,
      wasAnswered: false,
      timerId: action.timerId,
    };
  case RESET_TIMER:
    return {
      ...state,
      timer: 30,
    };
  case TICK:
    return {
      ...state,
      timer: state.timer - 1,
    };
  default:
    return state;
  }
};

export default timerReducer;
