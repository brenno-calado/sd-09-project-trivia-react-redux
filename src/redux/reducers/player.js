import { ADD_PLAYER, GET_USER_IMAGE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  score: 0,
  assertions: 0,
  gravatarEmail: '',
  useImageId: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      name: action.objectPlayer.name,
      score: action.objectPlayer.score,
      assertions: action.objectPlayer.assertions,
      gravatarEmail: action.objectPlayer.gravatarEmail,
    };
  case GET_USER_IMAGE:
    return { ...state, userImageId: action.url };
  default:
    return state;
  }
};

export default player;
