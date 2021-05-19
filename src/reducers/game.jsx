import { GET_API, SCORE, RESET_GAME } from '../actions';

const INITIAL_STATE = {
  responseCode: '',
  results: [],
  isFetching: true,
  gameBoard: {
    score: 0,
    assertions: 0,
  },
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_API: {
    const { answer } = action;
    return {
      ...state,
      responseCode: answer.response_code,
      results: answer.results,
      isFetching: false,
    };
  }
  case SCORE: {
    const { timer, counter } = action;
    const levels = ['easy', 'medium', 'hard'];
    const { gameBoard: { assertions, score }, results } = state;
    const ten = 10;
    return {
      ...state,
      gameBoard: {
        assertions: assertions + 1,
        score: score + ten
        + ((levels.findIndex((e) => e === results[counter].difficulty) + 1) * timer),
      },
    };
  }
  case RESET_GAME:
    return {
      ...state,
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
}
