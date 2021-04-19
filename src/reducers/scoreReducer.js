import { HANDLE_ASSERTION, SAVE_USER_DATA } from '../actions';

const INITIAL_STATE = { score: 0, assertions: 0 };

const scoreReducer = (state = INITIAL_STATE, action) => {
  const { type, score } = action;
  switch (type) {
  case HANDLE_ASSERTION:
    return {
      score: state.score + score,
      assertions: state.assertions + 1,
    };
  case SAVE_USER_DATA:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default scoreReducer;
