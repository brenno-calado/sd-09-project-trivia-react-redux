import mainAPI from '../services/mainAPI';
import getToken from '../services/tokenAPI';

export const USER_LOGIN = 'USER_LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const GET_API = 'GET_API';

export const userLogin = (email, name, score) => ({
  type: USER_LOGIN,
  email,
  name,
  score,
});

const getApi = (answer) => ({
  type: GET_API,
  answer,
});

export function fetchApi() {
  return async (dispatch) => {
    const { token } = await getToken();
    const answer = await mainAPI(token);
    dispatch(getApi(answer));
  };
}
