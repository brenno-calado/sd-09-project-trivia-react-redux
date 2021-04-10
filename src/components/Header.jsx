import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingsButton from './SettingsButton';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { playerScore: 0 };

    this.getGravatar = this.getGravatar.bind(this);
    this.getState = this.getState.bind(this);
  }

  componentDidMount() {
    this.getState();
  }

  getGravatar(email) {
    const hash = md5(email).toString();
    const emailHash = `https://www.gravatar.com/avatar/${hash}`;
    return emailHash;
  }

  getState() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state) {
      const { score } = state.player;
      const scoreNumber = parseInt(score, 10);
      this.setState({
        playerScore: scoreNumber,
      });
    }
  }

  render() {
    const { userName, userEmail } = this.props;
    const { playerScore } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(userEmail).toString()}` }
          alt="Imagem do Jogador"
        />
        <h3 data-testid="header-player-name">{ userName }</h3>
        <p data-testid="header-score">{playerScore}</p>
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
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
