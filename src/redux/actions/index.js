export const SUBMIT_USER = 'SUBMIT_USER';
export const TIMES_UP = 'TIMES_UP';
export const STOP_TIME = 'STOP_TIME';
export const GET_SECONDS = 'GET_SECONDS';
export const ADD_PLAYER = 'ADD_PLAYER';
export const RESTART_TIMER = 'RESTART_TIMER';
export const REMOVE_RESTART_TIMER = 'REMOVE_RESTART_TIMER';
export const GET_USER_IMAGE = 'GET_USER_IMAGE';
export const START_TIMER = 'START_TIMER';

export const submitUser = (name, email, token) => ({
  type: SUBMIT_USER,
  name,
  email,
  token,
});

export const timesUp = () => ({
  type: TIMES_UP,
});

export const stopTime = () => ({
  type: STOP_TIME,
});

export const getSeconds = (seconds) => ({
  type: GET_SECONDS,
  seconds,
});

export const addPlayer = (objectPlayer) => ({
  type: ADD_PLAYER,
  objectPlayer,
});

export const restartTimer = () => ({
  type: RESTART_TIMER,
});

export const removeRestartTimer = () => ({
  type: REMOVE_RESTART_TIMER,
});

export const getUserImage = (url) => ({
  type: GET_USER_IMAGE,
  url,
});

export const startTimer = () => ({
  type: START_TIMER,
});
