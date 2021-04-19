import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import HomeButton from './HomeButton';
// comentario
class Header extends React.Component {
  makeGravatarUrl() {
    const { email } = this.props;
    return `https://www.gravatar.com/avatar/${md5(email).toString()}`;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header>
        <img
          src={ this.makeGravatarUrl() }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
        <HomeButton />
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
