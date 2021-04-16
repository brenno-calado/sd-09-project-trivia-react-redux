import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addUserInfo from '../actions';
import ButtonSettings from '../components/ButtonSettings';
import fetchTrivia from '../actions/trivia';
import { userStorage } from '../services/storage';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      score: 0,
    };
    this.getValue = this.getValue.bind(this);
    this.proceedToGame = this.proceedToGame.bind(this);
  }

  getValue({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  proceedToGame() {
    const {
      addUserInfo: addUser,
      getTriviaQuestions,
      history,
    } = this.props;
    addUser(this.state);
    userStorage(this.state);
    getTriviaQuestions();
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    const disableButton = name === '' || email === '';

    return (
      <section>
        <input
          name="name"
          data-testid="input-player-name"
          type="text"
          onChange={ this.getValue }
          placeholder="Nome"
        />
        <input
          name="email"
          data-testid="input-gravatar-email"
          type="email"
          onChange={ this.getValue }
          placeholder="E-mail"
        />
        <button
          onClick={ this.proceedToGame }
          data-testid="btn-play"
          type="button"
          disabled={ disableButton }
        >
          Jogar
        </button>
        <ButtonSettings />
      </section>
    );
  }
}

const mapDispatchToProps = {
  addUserInfo,
  getTriviaQuestions: fetchTrivia,
};

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addUserInfo: PropTypes.func.isRequired,
  getTriviaQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
