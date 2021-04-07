import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { userEmail, userName, userAvatar } from '../actions/index';
import '../App.css';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      validated: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.fetchGravata = this.fetchGravata.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateInputs();
  }

  handleClick(email, name) {
    const { userEmailDispatcher, userNameDispatcher } = this.props;
    userEmailDispatcher(email);
    userNameDispatcher(name);
    this.fetchGravata();
  }

  validateInputs() {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({
        validated: false,
      });
    }
  }

  fetchGravata() {
    const { userAvatarDispatcher } = this.props;
    const { email } = this.props;
    const hashEmail = md5(email).toString();
    const urlAvatar = `https://www.gravatar.com/avatar/${hashEmail}`;
    userAvatarDispatcher(urlAvatar);
  }

  render() {
    const { validated, email, name } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            disabled={ validated }
            type="button"
            data-testid="btn-play"
            onClick={ () => this.handleClick(email, name) }
          >
            Jogar
          </button>
        </form>
      </header>
    );
  }
}

Login.propTypes = {
  userEmailDispatcher: PropTypes.func,
  userNameDispatcher: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  userEmailDispatcher: (email) => dispatch(userEmail(email)),
  userNameDispatcher: (name) => dispatch(userName(name)),
  userAvatarDispatcher: (avatar) => dispatch(userAvatar(avatar)),
});

const mapStatetoProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
