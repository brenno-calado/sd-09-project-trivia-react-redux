import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import gameReducer from './gameReducer';
import scoreReducer from './scoreReducer';

const rootReducer = combineReducers({
  loginReducer,
  gameReducer,
  scoreReducer,
});

export default rootReducer;
