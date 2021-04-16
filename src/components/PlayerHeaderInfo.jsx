import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class PlayerHeaderInfo extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.getLocalStorage = this.getLocalStorage.bind(this);
  // }

  // getLocalStorage() {
  //   const valid = localStorage.getItem('state');
  //   if (valid !== null) {
  //     return JSON.parse(valid);
  //   }
  // }

  render() {
    const { name, email, assertions, score } = this.props;
    const hash = md5(email.toLowerCase()).toString();
    const API_URL = `https://www.gravatar.com/avatar/${hash}?s=100`;
    // const headerInfo = this.getLocalStorage();
    // const { player: { assertions, score } } = headerInfo;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ API_URL }
          alt={ `${name} avatar` }
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
        <div>
          <p>Placar Final</p>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>
        <div>
          <p>Acertos</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </div>
      </header>
    );
  }
}

PlayerHeaderInfo.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
};

PlayerHeaderInfo.defaultProps = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const mapStateToProps = ({ player }) => ({
  name: player.name,
  email: player.email,
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(PlayerHeaderInfo);
