import md5 from 'crypto-js/md5';

export const getUserToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const getToken = await request.json();
  localStorage.setItem('token', (getToken.token));
  return getToken;
};

export const getUserGravatar = () => {
  const state = JSON.parse(localStorage.getItem('state'));
  const { gravatarEmail } = state.player;
  const hashGravatar = md5(gravatarEmail).toString();
  const gravatar = `https://www.gravatar.com/avatar/${hashGravatar}`;
  // const ranking = {
  //   name,
  //   score,
  //   picture: gravatar,
  // };

  // localStorage.setItem('ranking', JSON.stringify(ranking));
  return gravatar;
};

export const getQuestions = async () => {
  const token = localStorage.getItem('token');
  const numberQuestions = 5;
  const requestQuestions = await fetch(`https://opentdb.com/api.php?amount=${numberQuestions}&token=${token}`);
  const questions = await requestQuestions.json();
  return questions;
};
