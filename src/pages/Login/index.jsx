import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import * as S from './styled';

import { fetchAPI } from '../../redux/action';

const ONE_SECONDS = 1000;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submmit: false,
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
      settings: false,
      animation: false,
    };
    this.handleValidation = this.handleValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.formFunction = this.formFunction.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  handleLocalStorage() {
    const { token } = this.props;
    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify(this.state));
    this.setState({ animation: true });

    setTimeout(() => {
      this.setState({
        submmit: true,
      });
    }, ONE_SECONDS);
  }

  handleSettings() {
    this.setState({
      settings: true,
    });
  }

  handleValidation() {
    const { player: { name, gravatarEmail } } = this.state;
    return !(name && gravatarEmail);
  }

  handleChange({ target: { name, value } }) {
    this.setState((previousState) => (
      {
        player: {
          ...previousState.player,
          [name]: value,
        },
      }
    ));
  }

  FormButtons() {
    const { getToken } = this.props;
    return (
      <S.ButtonsContainer>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ this.handleValidation() }
          onClick={ async () => {
            await getToken();
            this.handleLocalStorage();
          } }
        >
          Entrar
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleSettings }
        >
          Configurações
        </button>
      </S.ButtonsContainer>
    );
  }

  formFunction() {
    return (

      <S.Form>
        <h1>Login</h1>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Digite seu nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="gravatarEmail"
            type="text"
            placeholder="email@email.com"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        { this.FormButtons() }
      </S.Form>

    );
  }

  render() {
    const { submmit, settings, animation } = this.state;

    if (settings) {
      return (
        <Redirect to="/settings" />
      );
    }

    if (submmit) {
      return (
        <Redirect to="/game" />
      );
    }

    return (
      <S.AnimationContiner animation={ (animation) ? 'slide' : '' }>
        {this.formFunction()}
      </S.AnimationContiner>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchAPI()),
});

Login.propTypes = {
  token: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
