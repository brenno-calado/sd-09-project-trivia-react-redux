import { questionsRequest } from '../services/api';
import { GET_PLAYER_NAME, GET_PLAYER_EMAIL, GET_TOKEN, GET_QUESTIONS,
  UPDATE_INDEX, COUNT_POINTS } from './actionTypes';

export const updateToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const updateIndex = (index) => ({
  type: UPDATE_INDEX,
  index,
});

export const updatePlayerName = (name) => ({
  type: GET_PLAYER_NAME,
  name,
});

export const updatePlayerEmail = (email) => ({
  type: GET_PLAYER_EMAIL,
  email,
});

export const updateQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const updateScore = (score) => ({
  type: COUNT_POINTS,
  score,
});

export function fetchQuestions(token) {
  return (dispatch) => (
    questionsRequest(token)
      .then((data) => dispatch(updateQuestions(data)))
  );
}
