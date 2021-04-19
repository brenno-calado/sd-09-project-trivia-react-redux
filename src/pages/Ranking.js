import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
    this.getRanking = this.getRanking.bind(this);
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const NUMBER_ONE = 1;
    const NUMBER_ONE_NEGATIVE = -1;
    const NUMBER_ZERO = 0;
    if (ranking !== null) {
      const orderedRanking = ranking.sort((objA, objB) => {
        if (objA.score > objB.score) return NUMBER_ONE_NEGATIVE;
        if (objA.score < objB.score) return NUMBER_ONE;
        return NUMBER_ZERO;
      });
      this.setState({
        ranking: orderedRanking,
      });
    }
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { ranking.map((player, index) => (
            <li key={ `${player.name}-${index}` }>
              <img src={ player.picture } alt="player" />
              <p>
                Nome:
                <span data-testid={ `player-name-${index}` }>{ player.name }</span>
              </p>
              <p>
                Pontuação:
                <span data-testid={ `player-score-${index}` }>{ player.score }</span>
              </p>
            </li>
          )) }
        </ol>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar ao inicio
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
