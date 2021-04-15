import { getAnswer } from '../../services/triviaApi';

export const SET_DATA_GAME = 'SET_DATA_GAME';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';

export const dataGame = (data) => ({
  type: SET_DATA_GAME,
  data,
});

export const handleUserName = (nameInput) => ({
  type: SET_USER_NAME,
  nameInput,
});
export const handleUserEmail = (email) => ({
  type: SET_USER_EMAIL,
  email,
});

export const handleAssertions = (assertions) => ({
  type: SET_ASSERTIONS,
  assertions,
});

export const fetchQuestions = (num, token) => (dispatch) => (
  getAnswer(num, token).then((result) => dispatch(dataGame(result)))
);

export const WAS_ANSWERED = 'WAS_ANSWERED';
export const START_TIMER = 'START_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const TICK = 'TICK';

export const startTimer = (timerId) => ({
  type: START_TIMER,
  timerId,
});

export const tick = () => ({
  type: TICK,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});

export const wasAnsweredAction = () => ({
  type: WAS_ANSWERED,
});
