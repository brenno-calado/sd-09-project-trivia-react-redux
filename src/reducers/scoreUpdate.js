import { SCORE_UPDATE } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
};

const scoreUpdate = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE_UPDATE:
    return {
      ...state,
      assertions: action.assertions,
      score: action.score,
    };
  default:
    return state;
  }
};

export default scoreUpdate;
