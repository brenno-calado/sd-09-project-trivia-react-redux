import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IoPlayOutline } from 'react-icons/io5';
import { playerLogin, requestApiToken, requestApiQuestions } from '../redux/actions';
import SelectSettings from '../Components/SelectSettings';
import Cube from './cube';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      disableBtn: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.play = this.play.bind(this);
    this.createLocalStorage = this.createLocalStorage.bind(this);
    this.createBtnPlay = this.createBtnPlay.bind(this);
  }

  createLocalStorage() {
    const { name, email: gravatarEmail } = this.state;
    const player = { name, gravatarEmail, assertions: 0, score: 0 };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleLogin();
    });
  }

  handleLogin() {
    const { email, name } = this.state;
    const { dispatchNameEmail } = this.props;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        disableBtn: false,
      });
      dispatchNameEmail(email, name);
    } else {
      this.setState({
        disableBtn: true,
      });
    }
  }

  play() {
    const { getToken, getQuestions } = this.props;
    getQuestions();
    getToken();
    this.createLocalStorage();
  }

  createBtnPlay() {
    const { disableBtn } = this.state;
    return (
      <Link to="/trivia">
        <button
          className="btnLogin play"
          data-testid="btn-play"
          type="button"
          disabled={ disableBtn }
          onClick={ this.play }
        >
          <IoPlayOutline className="play" />
        </button>
      </Link>
    );
  }

  render() {
    const { email, name } = this.state;
    return (
      <div className="grid">
        <div className="backgroundLogin">
          <div className="container">
            <Cube />
            <div className="inputContainer">
              <input
                className="inputLogin"
                data-testid="input-player-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                placeholder="Informe seu nome"
                autoComplete="off"
              />
              <input
                className="inputLogin"
                data-testid="input-gravatar-email"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                placeholder="Informe seu email"
                autoComplete="off"
              />
            </div>
            <div className="buttonContainer">
              { this.createBtnPlay() }
              <SelectSettings />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  player: state.player.player,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNameEmail: (email, name) => dispatch(playerLogin(email, name)),
  getToken: () => dispatch(requestApiToken()),
  getQuestions: () => dispatch(requestApiQuestions()),
});

Login.propTypes = {
  dispatchNameEmail: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
