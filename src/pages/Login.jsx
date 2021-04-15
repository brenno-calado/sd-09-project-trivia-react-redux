import React from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getToken } from '../services/triviaApi';
import { dataGame, handleUserEmail, fetchQuestions, handleUserName }
  from '../redux/actions';
import './css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      disableButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateGlobalStates = this.updateGlobalStates.bind(this);
  }

  async updateGlobalStates() {
    const { user, email } = this.state;
    const { propHandleUser, propHandleEmail, propFetchQuestions } = this.props;
    const token = await getToken();
    const state = {
      player: {
        name: user,
        assertions: 0,
        score: 0,
        gravatarEmail: md5(email).toString(),
      },
    };
    localStorage.setItem('token', token.token);
    localStorage.setItem('state', JSON.stringify(state));
    const localToken = localStorage.getItem('token');
    const numQuestion = 5;
    propHandleUser(user);
    propHandleEmail(md5(email).toString());
    propFetchQuestions(numQuestion, localToken);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => {
      const { user, email } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const min = 0;
      if (regex.test(email) && user.length > min) {
        this.setState({ disableButton: false });
      } else this.setState({ disableButton: true });
    });
  }

  render() {
    const { disableButton } = this.state;
    return (
      <div className="form-login">
        <form className="fieldset-login">
          <label htmlFor="enter-name">
            Nome:
            <input
              id="enter-name"
              className="enter-name"
              data-testid="input-player-name"
              type="text"
              name="user"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="enter-email" className="label-login">
            E-mail:
            <input
              id="enter-email"
              className="enter-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/question">
            <button
              className="btn-play"
              type="button"
              data-testid="btn-play"
              disabled={ disableButton }
              onClick={ this.updateGlobalStates }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button className="btn-settings" type="button" data-testid="btn-settings">
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  propDataGame: (data) => dispatch(dataGame(data)),
  propHandleUser: (user) => dispatch(handleUserName(user)),
  propHandleEmail: (email) => dispatch(handleUserEmail(email)),
  propFetchQuestions: (num, token) => dispatch(fetchQuestions(num, token)),
});

Login.propTypes = {
  propDataGame: func,
  propHandlePlayerData: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
