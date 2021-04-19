import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { picture, name, score } = this.props;

    // const userData = JSON.parse(localStorage.getItem('ranking'));
    // const { picture, name, score } = userData;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ picture }
          alt="Profile-Avatar"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerReducer.player.name,
  score: state.playerReducer.player.score,
  picture: state.playerReducer.picture,
});

Header.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
