import React from 'react';
import PropTypes from 'prop-types';
import { readFromStorage } from '../services/api';

export default class Header extends React.Component {
  render() {
    const loggedPlayer = readFromStorage('state');
    const { name, score, picture } = loggedPlayer.player;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ picture }
          alt="Profile-Avatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
