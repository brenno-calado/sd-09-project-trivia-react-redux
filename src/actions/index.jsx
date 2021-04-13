export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (email, name, score) => ({
  type: USER_LOGIN,
  email,
  name,
  score,
});
