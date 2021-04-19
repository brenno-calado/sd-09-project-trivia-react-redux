import {
  STOP_TIME,
  TIMES_UP,
  GET_SECONDS,
  RESTART_TIMER,
  REMOVE_RESTART_TIMER,
  START_TIMER,
} from '../actions';

const INITIAL_STATE = {
  timesUp: false,
  stopTime: false,
  seconds: 30,
  restartTimer: false,
  startTimer: false,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case START_TIMER:
    return { ...state, startTimer: !state.startTimer };
  case TIMES_UP:
    return { ...state, timesUp: true, seconds: action.seconds };
  case STOP_TIME:
    return { ...state, stopTime: !state.stopTime };
  case GET_SECONDS:
    return { ...state, seconds: action.seconds };
  case RESTART_TIMER:
    return { ...state, restartTimer: true, stopTime: false, timesUp: false };
  case REMOVE_RESTART_TIMER:
    return { ...state, restartTimer: false };
  default:
    return state;
  }
};

export default timer;
