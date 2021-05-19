import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gravatar: '',
    };

    this.gravatar = this.gravatar.bind(this);
  }

  componentDidMount() {
    this.gravatar();
  }

  gravatar() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      gravatar,
    });
  }

  render() {
    const { name, score } = this.props;
    const { gravatar } = this.state;
    console.log(gravatar);
    return (
      <header className="feedback-header">
        <img
          src={ gravatar }
          alt="player-avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          Nome do Jogador:
          <span>{name}</span>
        </p>
        <p>
          Score:
          <span data-testid="header-score">{score}</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.game.gameBoard.score,
});

export default connect(mapStateToProps, null)(Header);
