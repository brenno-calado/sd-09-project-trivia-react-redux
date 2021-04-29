import md5 from 'crypto-js/md5';

export const readFromStorage = (key) => JSON.parse(localStorage.getItem(key));

export const getUserGravatar = () => {
  const state = readFromStorage('state');
  const { gravatarEmail } = state.player;
  const hashGravatar = md5(gravatarEmail).toString();
  const gravatar = `https://www.gravatar.com/avatar/${hashGravatar}`;
  return gravatar;
};

export const getUserToken = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const requestToken = await fetch(endpoint);
  const getToken = await requestToken.json();

  localStorage.setItem('token', (getToken.token));
  return getToken;
};

export const getQuestions = async () => {
  const token = localStorage.getItem('token');
  const numberQuestions = 5;
  const requestQuestions = await fetch(`https://opentdb.com/api.php?amount=${numberQuestions}&token=${token}`);
  const questions = await requestQuestions.json();
  return questions;
};
