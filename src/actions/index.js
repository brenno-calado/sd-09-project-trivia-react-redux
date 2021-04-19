import fetchTrivaToken from '../service/triviaApi';
import fetchQuestionsApi from '../service/questionsApi';

export const requestQuestionsApi = (questions) => ({
  type: 'REQUEST_QUESTIONS',
  questions,
});

export const fetchQuestions = (token) => (dispach) => {
  localStorage.setItem('token', token);
  fetchQuestionsApi(token)
    .then((questionsApiResponse) => dispach(requestQuestionsApi(questionsApiResponse)));
};

export const loading = () => ({ type: 'LOADING' });

export const fetchTrivaApi = () => async (dispach) => {
  dispach(loading());
  const triviaApiResponse = await fetchTrivaToken();
  return dispach(fetchQuestions(triviaApiResponse.token));
};

export const requestUserInfo = (email, name, hash) => ({
  type: 'REQUEST_USER_INFO',
  email,
  name,
  hash,
});

export const setScore = (score) => ({
  type: 'SET_SCORE',
  score,
});

export const resetScore = () => ({
  type: 'RESET_SCORE',
});
