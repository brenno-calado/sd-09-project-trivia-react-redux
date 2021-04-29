import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
  RECEIVE_DATA_PLAYER,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  picture: '',
  token: '',
  isFetching: false,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.token,
      isFetching: false,
    };
  case REQUEST_TOKEN_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case RECEIVE_DATA_PLAYER:
    return {
      ...state,
      player: action.player,
      picture: action.picture,
    };
  default:
    return state;
  }
};

export default playerReducer;
