const INITIAL_STATE = {
  score: 0,
};

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_SCORE':
    return {
      ...state,
      score: state.score + action.score,
    };
  case 'RESET_SCORE':
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default mainReducer;
