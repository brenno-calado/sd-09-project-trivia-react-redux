import { SAVE_USER_DATA, RECEIVE_ERROR_TOKEN_API } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  errorToken: false,
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER_DATA:
    return {
      ...state,
      name: action.name,
      email: action.email,
      token: action.token,
      gravatarEmail: action.gravatarEmail,
    };
  case RECEIVE_ERROR_TOKEN_API:
    return { ...state, errorToken: true };
  default:
    return state;
  }
}

export default loginReducer;
