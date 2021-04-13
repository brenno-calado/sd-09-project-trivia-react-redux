import { combineReducers } from 'redux';
import user from './user';
import receiveToken from './receiveToken';
import game from './game';

const rootReducer = combineReducers({
  user,
  receiveToken,
  game,
});

export default rootReducer;
