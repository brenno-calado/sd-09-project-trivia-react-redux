import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/fetchToken';
import { userLogin } from '../actions';
// import '../App.css';
import '../styles/Login.css';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      score: 0,
      validated: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateInputs();
  }

  validateInputs() {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({
        validated: false,
      });
    }
  }

  async handleClick() {
    const { token, history, login } = this.props;
    const { email, name, score } = this.state;
    await token();
    login(email, name, score);
    history.push('./game');
  }

  render() {
    const { history } = this.props;
    const { validated } = this.state;

    return (
      <div className="App-container">
        <img src={ logo } className="App-logo" alt="logo" />
        <form className="form-container">
          <button
            className="configurations-button"
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/configurations') }
          >
            {}
          </button>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="play-button"
            disabled={ validated }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  token: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  login: PropTypes.func.isRequired,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  token: (key) => dispatch(fetchToken(key)),
  login: (email, name, score) => dispatch(userLogin(email, name, score)),
});

export default connect(null, mapDispatchToProps)(Login);
