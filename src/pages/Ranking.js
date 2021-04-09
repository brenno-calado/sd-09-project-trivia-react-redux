import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.setRankingState = this.setRankingState.bind(this);
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    this.setRankingState(players);
  }

  setRankingState(array) {
    this.setState({ players: [...array] });
  }

  render() {
    const { players } = this.state;
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking</h3>
        { players.map((player, index) => (
          <div key={ player.name }>
            <img src={ player.gravatarEmail } alt="player" />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
