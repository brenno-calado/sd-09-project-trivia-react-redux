import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { string, number } from 'prop-types';
import { connect } from 'react-redux';
import SettingsButton from './SettingsButton';

class Header extends Component {
  constructor(props) {
    super(props);

    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar(email) {
    const hash = md5(email).toString();
    const emailHash = `https://www.gravatar.com/avatar/${hash}`;
    return emailHash;
  }

  render() {
    const { userName, userEmail, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.getGravatar(userEmail) }
          alt="Imagem do Jogador"
        />
        <h3 data-testid="header-player-name">{ userName }</h3>
        <p data-testid="header-score">{score}</p>
        <SettingsButton />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.userName,
  userEmail: state.loginReducer.userEmail,
});

Header.propTypes = {
  userName: string.isRequired,
  userEmail: string.isRequired,
  score: number.isRequired,
};

export default connect(mapStateToProps)(Header);
