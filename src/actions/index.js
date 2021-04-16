import {
  fetchTriviaToken,
  fetchTriviaQuestions,

} from '../services';

export const NEW_PLAYER = 'NEW_PLAYER';
export const NEW_GAME = 'NEW_GAME';
export const SCORE_UPDATE = 'SCORE_UPDATE';
export const GAME_QUESTIONS = 'GAME_QUESTIONS';
export const LOADING_QUESTIONS = 'LOADING_QUESTIONS';
export const ANSWERED_CORRECTLY = 'ANSWERED_CORRECTLY';

export const newPlayerInfo = (name, email, score, assertions) => ({
  type: NEW_PLAYER,
  name,
  email,
  assertions,
  score,
});

export const scoreUpdateAction = (score, assertions) => ({
  type: SCORE_UPDATE,
  assertions,
  score,
});

const receiveToken = (gameToken) => ({
  type: NEW_GAME,
  gameToken,
});

export function fetchNewGameToken() {
  return async (dispatch) => {
    const newGame = await fetchTriviaToken();
    return dispatch(receiveToken(newGame));
  };
}

const loadingQuestions = () => ({
  type: LOADING_QUESTIONS,
  payload: true,
});

const receiveQuestions = (gameQuestions) => ({
  type: GAME_QUESTIONS,
  payload: false,
  gameQuestions,
});

export function fetchGameQuestions(token) {
  return async (dispatch) => {
    dispatch(loadingQuestions());
    const gameQuestions = await fetchTriviaQuestions(token);

    return dispatch(receiveQuestions(gameQuestions));
  };
}

export const updateScore = (assertions, score) => ({
  type: ANSWERED_CORRECTLY,
  assertions,
  score,
});
