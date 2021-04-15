import { combineReducers } from 'redux';
import dataGame from './gameReducer';
import player from './playerReducer';
import timer from './timerReducer';

const rootReducer = combineReducers({ dataGame, player, timer });

export default rootReducer;
