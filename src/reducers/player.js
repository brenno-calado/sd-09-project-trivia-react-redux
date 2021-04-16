import { NEW_PLAYER, ANSWERED_CORRECTLY } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  email: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_PLAYER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case ANSWERED_CORRECTLY:
    return {
      ...state,
      assertions: action.assertions,
      score: action.score,
    };
  default:
    return state;
  }
};

export default player;
