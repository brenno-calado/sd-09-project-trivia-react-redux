import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayerToken, fetchQuestions, receiveDataPlayer } from '../actions';
import { getUserGravatar } from '../services/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin() {
    const { name, email } = this.state;
    const { getPlayerToken, getQuestionAndAnswers, setDataPlayer } = this.props;
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };

    localStorage.setItem('state', JSON.stringify({ player }));
    await getPlayerToken();
    await getQuestionAndAnswers();
    setDataPlayer(player, getUserGravatar());
    this.setState({ redirect: true });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, name: userName } = this.state;
      const validateEmail = /\w+@\w+(.com)/;
      if (validateEmail.test(email) && userName) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  render() {
    const { isDisabled, redirect } = this.state;
    return (
      redirect
        ? (
          <Redirect to="/gaming" />
        ) : (
          <form>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                id="email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </label>

            <label htmlFor="name">
              Nome:
              <input
                type="text"
                name="name"
                id="name"
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </label>

            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleLogin }
            >
              Jogar
            </button>
          </form>
        )
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPlayerToken: () => dispatch(fetchPlayerToken()),
  getQuestionAndAnswers: () => dispatch(fetchQuestions()),
  setDataPlayer: (player, picture) => dispatch(receiveDataPlayer(player, picture)),
});

Login.propTypes = {
  getPlayerToken: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
