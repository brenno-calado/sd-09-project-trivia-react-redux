import { GET_API } from '../actions';

const INITIAL_STATE = {
  responseCode: '',
  results: '',
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_API: {
    const { answer } = action;
    return {
      ...state,
      responseCode: answer.response_code,
      results: answer.results,
    };
  }
  default:
    return state;
  }
}
