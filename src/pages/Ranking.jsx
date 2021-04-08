import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.mapRankingPlayers = this.mapRankingPlayers.bind(this);
    this.layoutPlayer = this.layoutPlayer.bind(this);
  }

  layoutPlayer(player, index) {
    return (
      <section key={ player.name + index }>
        <h3>{`${index + 1}º lugar`}</h3>
        <span>
          <img
            src={ player.picture }
            alt="imagem do jogador"
          />
          <span data-testid={ `player-name-${index}` }>{player.name}</span>
          <span data-testid={ `player-score-${index}` }>{player.score}</span>
        </span>
      </section>
    );
  }

  mapRankingPlayers() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => Number(b.score) - Number(a.score));
    return ranking.map((player, index) => this.layoutPlayer(player, index));
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          {this.mapRankingPlayers()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.trivia.gravatar,
});

// xablau

export default connect(mapStateToProps)(Ranking);
