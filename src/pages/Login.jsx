import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrivaApi } from '../actions';
import SettingsButton from '../components/SettingsButton';
import loginPanel from './loginPanel.png';
import '../App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonSubmit: true,
      loginEmail: '',
      loginName: '',
    };

    this.changeState = this.changeState.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
  }

  changeState({ target: { id, value } }) {
    const { loginEmail, loginName } = this.state;

    this.setState({ [id]: value });

    if ((loginEmail.length === 0) || (loginName.length === 0)) {
      this.setState({ buttonSubmit: true });
    } else {
      this.setState({ buttonSubmit: false });
    }
  }

  async fetchToken() {
    const { fetchAPI, token } = this.props;
    await fetchAPI();
    localStorage.setItem('token', token);
  }

  fields(changeState, buttonSubmit) {
    return (
      <>
        <label htmlFor="loginEmail">
          Email:
          <br />
          <input
            data-testid="input-gravatar-email"
            type="text"
            placeholder="example@email.com"
            id="loginEmail"
            onChange={ changeState }
            required
          />
        </label>
        <label htmlFor="loginName">
          Nome:
          <br />
          <input
            data-testid="input-player-name"
            type="text"
            placeholder="Jogador1"
            id="loginName"
            onChange={ changeState }
            required
          />
        </label>
        <br />
        <input
          data-testid="btn-play"
          type="button"
          value="Jogar"
          className="login-button"
          onClick={ this.fetchToken }
          disabled={ buttonSubmit }
        />
        <SettingsButton />
      </>
    );
  }

  render() {
    const { buttonSubmit } = this.state;
    return (
      <main>
        <article>
          <h1 className="title-main">Bem vindos ao jogo Trivia</h1>
          <p>
            Teste e aumente seus conhecimentos com milhares de perguntas,
            <br />
            perguntas no estilo clássico de 4 alternativas, verdadeiro/falso,
            <br />
            bandeiras, enigmas sobre pontos turísticos, e muito mais.
          </p>
          <p>
            No game, o jogador pode testar os seus conhecimentos em diversas
            <br />
            categorias, como Literatura, Entretenimento, História e Ciências.
          </p>
          <h2>Coloque seu e-mail e nome para participar do jogo.</h2>
          <form className="login-form">
            { this.fields(this.changeState, buttonSubmit) }
          </form>
        </article>
        <img src={ loginPanel } alt="Painel de Login" className="login-img" />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchTrivaApi()),
});

Login.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
