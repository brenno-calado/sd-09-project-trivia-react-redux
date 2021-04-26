import md5 from 'crypto-js/md5';

export const readFromStorage = (key) => JSON.parse(localStorage.getItem(key));

export const getUserGravatar = () => {
  const state = readFromStorage('state');
  const { name, score, gravatarEmail } = state.player;
  const hashGravatar = md5(gravatarEmail).toString();
  const endpoint = `https://www.gravatar.com/avatar/${hashGravatar}`;
  const gravatarImage = endpoint;
  const gamePlayer = {
    name,
    score,
    picture: gravatarImage,
  };

  localStorage.setItem('ranking', JSON.stringify(
    !readFromStorage('ranking')
      ? (
        [gamePlayer]
      ) : (
        [...readFromStorage('ranking'), gamePlayer]
      ),
  ));
};

export const getUserToken = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const requestToken = await fetch(endpoint);
  const getToken = await requestToken.json();

  localStorage.setItem('token', (getToken.token));
  return getToken;
};
