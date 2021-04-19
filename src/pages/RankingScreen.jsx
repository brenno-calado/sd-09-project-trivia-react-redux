import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import RankingList from '../components/Ranking';

export default class RankingScreen extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Voltar para home
        </button>
        <RankingList />
      </>
    );
  }
}

RankingScreen.propTypes = {
  history: shape({
    push: func,
  }),
}.isRequired;
