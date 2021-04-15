import { SET_USER_NAME, SET_USER_EMAIL, SET_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_NAME:
    return {
      ...state,
      name: action.nameInput,
    };
  case SET_USER_EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  case SET_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.assertions,
    };
  default:
    return state;
  }
};

export default playerReducer;
