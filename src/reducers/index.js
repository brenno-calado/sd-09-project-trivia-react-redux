import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({ playerReducer, questionsReducer });

export default rootReducer;
