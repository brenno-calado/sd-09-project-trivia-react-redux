import { getToken, getQuestions } from '../services/triviaAPI';
import createGravatar from '../services/gravatar';

export const HANDLE_ASSERTION = 'HANDLE_ASSERTION';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const SAVE_QUESTIONS_DATA = 'SAVE_QUESTIONS_DATA';
export const SAVE_GAME_DATA = 'SAVE_GAME_DATA';
export const RECEIVE_ERROR_TOKEN_API = 'RECEIVE_ERROR_TOKEN_API';
export const RECEIVE_ERROR_GAME_API = 'RECEIVE_ERROR_GAME_API';

const saveUserData = (name, email, token, gravatarEmail) => ({
  type: SAVE_USER_DATA,
  name,
  email,
  token,
  gravatarEmail,
});

const saveQuestionsData = (questions) => ({
  type: SAVE_QUESTIONS_DATA,
  questions,
});

const receiveErrorTokenAPI = () => ({ type: RECEIVE_ERROR_TOKEN_API });

const receiveErrorGameAPI = (error) => ({
  type: RECEIVE_ERROR_GAME_API,
  error,
});

export const handleLogin = (name, email) => async (dispatch) => {
  try {
    const token = await getToken();
    const gravatarEmail = createGravatar(email);
    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
      },
    }));
    return dispatch(saveUserData(name, email, token, gravatarEmail));
  } catch (err) {
    return dispatch(receiveErrorTokenAPI());
  }
};

export const fetchGameData = (token) => async (dispatch) => {
  try {
    const questions = await getQuestions(token);
    return dispatch(saveQuestionsData(questions));
  } catch (error) {
    return dispatch(receiveErrorGameAPI(error));
  }
};

export const handleAssertion = (timer, difficultyWeight) => {
  const FACTOR_SUM = 10;
  const score = FACTOR_SUM + (timer * difficultyWeight);
  return { type: HANDLE_ASSERTION, score };
};
