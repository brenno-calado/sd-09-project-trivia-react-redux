import React from 'react';
import Router from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';
// import App from './App';
// import CardQuestion from './components/CardQuestion';
import reducers from './reducers/index';
import Game from './pages/Game';
import CardQuestion from './components/CardQuestion';
import App from './App';

const createMockStore = (state) => (
  createStore(reducers, state, applyMiddleware(thunk))
);

const renderWithRedux = (
  component,
  { initialState, store = createMockStore(initialState) } = {}
) => {
  const history = createMemoryHistory();
  return {
    ...render(<Provider store={store}><Router history={history}>{component}</Router></Provider>),
    store, history,
  }
}

test('Verifica flexibilidade do botão proxima pergunta', () => {
  const { getByTestId} = renderWithRedux(<App />);
  const name = getByTestId('input-player-name');
  const email = getByTestId('input-gravatar-email');
  // const playBtn = getByTestId('btn-play');

  fireEvent.change(name.value, 'may');
  fireEvent.change(email.value, 'may@you');
  // fireEvent.click(playBtn);

  expect(name).toBeInTheDocument();
});
