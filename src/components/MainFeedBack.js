import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MainFeedBack extends React.Component {
  componentDidMount() {
    const { playerName, playerScore, pictureHash } = this.props;
    const playerObject = {
      nome: playerName,
      score: playerScore,
      picture: `https://www.gravatar.com/avatar/${pictureHash}`,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    localStorage.setItem('ranking', JSON.stringify(ranking.concat(playerObject)));
  }

  render() {
    const assertions = JSON.parse(localStorage.getItem('state'));
    const minAssertions = 3;
    return (
      <>
        <h2 data-testid="feedback-total-question">{ assertions.player.assertions }</h2>
        {assertions.player.assertions < minAssertions
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking:
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.loginReducer.name,
  playerScore: state.mainReducer.score,
  pictureHash: state.loginReducer.hash,
});

MainFeedBack.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  pictureHash: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MainFeedBack);
