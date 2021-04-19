import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import Header from '../components/Header';
import { fetchGameData } from '../actions/index';
import Questions from '../components/Questions';

import './Game.css';

class Game extends Component {
  componentDidMount() {
    const { getGameData, token } = this.props;
    getGameData(token);
  }

  render() {
    return (
      <>
        <Header />
        <Questions />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  getGameData: (token) => dispatch(fetchGameData(token)),
});

Game.propTypes = {
  getGameData: func,
  token: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
