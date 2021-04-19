import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  NEXT_QUESTION,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  questions: [],
  responseCode: '',
  questionNumber: 0,
  isFetching: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_QUESTIONS_SUCCESS: {
    const { response_code: responseCode, results } = action.questions;
    return {
      ...state,
      questions: results,
      responseCode,
      isFetching: false,
    };
  }
  case NEXT_QUESTION:
    return {
      ...state,
      questionNumber: action.questionNumber,
    };
  default:
    return state;
  }
};

export default questionsReducer;
