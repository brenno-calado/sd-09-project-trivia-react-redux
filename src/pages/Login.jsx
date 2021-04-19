import React from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { handleLogin as loginAction } from '../actions';
import SettingsButton from '../components/SettingsButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loginError: false,
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyTextInputs = this.verifyTextInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  verifyTextInputs() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      return false;
    }
    return true;
  }

  async handleClick() {
    const { handleLogin, history } = this.props;
    const { name, email } = this.state;
    try {
      await handleLogin(name, email);
      history.push('/game');
    } catch (error) {
      this.setState({ loginError: true, error });
    }
  }

  render() {
    const { name, email, loginError, error } = this.state;
    return (
      <div>
        <SettingsButton />
        <h1>Login</h1>
        {
          loginError && <p>{ error }</p>
        }
        <form>
          <label
            htmlFor="name-input"
          >
            Nome:
            <input
              type="text"
              itemID="name-input"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label
            htmlFor="email-input"
          >
            E-mail:
            <input
              type="email"
              itemID="email-input"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              required
            />
          </label>
        </form>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.verifyTextInputs() }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (name, email) => dispatch(loginAction(name, email)),
});

Login.propTypes = {
  handleLogin: func,
  history: shape({ push: func }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
