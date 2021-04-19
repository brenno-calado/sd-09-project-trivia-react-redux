import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchToken from '../services/tokenGenerator';
import { loginEmail, loginName, questionsThunk } from '../actions';
import TriviaPic from '../trivia.png';
import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      email: '',
      name: '',
      redirect: false,
    };
    this.formGenerator = this.formGenerator.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputsValidator = this.inputsValidator.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.inputsValidator());
  }

  async handleClick() {
    const { fetchAndSaveQuestions, saveEmail, saveName } = this.props;
    const { email, name } = this.state;
    const getToken = await fetchToken();
    localStorage.setItem('token', getToken.token);
    fetchAndSaveQuestions();
    saveEmail(email);
    saveName(name);
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
    if (!localStorage.getItem('ranking')) {
      const newRanking = [];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
    this.setState({
      redirect: true,
    });
  }

  inputsValidator() {
    const { email, name } = this.state;
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    if (emailRegex.test(email) && name.length > 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  formGenerator() {
    const { isDisabled, email, name } = this.state;
    return (
      <div className="form-container">
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            id="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <div className="buttons-container">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <Link to="/config">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/play" />;
    return (
      <div className="login-inputs-container">
        <img src={ TriviaPic } alt="Trivia Pic" />
        { this.formGenerator() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAndSaveQuestions: () => dispatch(questionsThunk()),
  saveEmail: (email) => dispatch(loginEmail(email)),
  saveName: (name) => dispatch(loginName(name)),
});

Login.propTypes = {
  fetchAndSaveQuestions: PropTypes.func.isRequired,
  saveEmail: PropTypes.func.isRequired,
  saveName: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
