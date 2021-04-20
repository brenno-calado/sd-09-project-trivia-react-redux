import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Api from '../service/Api';
import { submitUser, addPlayer } from '../redux/actions';
import '../styles/pages/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      loggedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState(() => ({
      [name]: value,
    }), () => {
      const { name: nameInput, email } = this.state;
      if ((email.length > 0)
        && (nameInput.length > 0)
        && (/\S+@\S+\.\S+/.test(email))) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  async handleClick() {
    const { dispatchUser, dispatchPlayer } = this.props;
    const { name, email } = this.state;
    this.setState({
      loggedIn: true,
    });
    const object = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(object));
    const resultApi = await Api.fetchToken();
    localStorage.setItem('token', resultApi);
    dispatchUser(name, email, resultApi);
    dispatchPlayer(object.player);
  }

  render() {
    const { name, email, isDisabled, loggedIn } = this.state;
    return (
      <div className="login-container">
        <div className="settings-button-container">
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">Settings</button>
          </Link>
        </div>
        <div className="login-form-container">
          <h1>TRIVIA</h1>
          <form className="login-form">
            <input
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
              placeholder="Name"
            />
            <input
              id="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              placeholder="Email"
            />
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ isDisabled }
            >
              Play
            </button>
          </form>
        </div>
        { (loggedIn) && <Redirect to="/game" /> }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (name, email, token) => dispatch(submitUser(name, email, token)),
  dispatchPlayer: (object) => dispatch(addPlayer(object)),
});

Login.propTypes = {
  dispatchUser: PropTypes.func,
}.isRequered;

export default connect(null, mapDispatchToProps)(Login);
