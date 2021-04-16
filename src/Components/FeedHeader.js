import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './feedHeader.css';

class FeedHeader extends Component {
  constructor() {
    super();
    this.state = {
      hash: '',
    };
    this.getHash = this.getHash.bind(this);
  }

  componentDidMount() {
    this.getHash();
  }

  getHash() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({
      hash,
    });
  }

  render() {
    const { name, score } = this.props;
    const { hash } = this.state;
    return (
      <div className="feedHeader">
        <img
          alt="profile-img"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
        />
        <p data-testid="header-player-name">{`Usuário: ${name}`}</p>
        <p data-testid="header-score">{`Pontuação: ${score}`}</p>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

FeedHeader.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStatetoProps)(FeedHeader);
