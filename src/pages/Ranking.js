import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Ranking.css';

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
        if ((objA.score) > (objB.score)) return NUMBER_ONE_NEGATIVE;
        if ((objA.score) < (objB.score)) return NUMBER_ONE;
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
      <div className="ranking-container">
        <div>
          <h1 data-testid="ranking-title">RANKING</h1>
        </div>
        { (ranking.length === 0) ? (
          <p>No players found!</p>
        ) : (
          <ol className="ranking-list">
            { ranking.map((player, index) => (
              <li
                key={ `${player.name}-${index}` }
                className={ (index === 0) ? 'first-place' : 'competitors' }
              >
                <img src={ player.picture } alt="player" />
                <p>
                  <span className="label">{ `${index + 1}st place` }</span>
                </p>
                <p>
                  <span className="label">Name: </span>
                  <span data-testid={ `player-name-${index}` }>{ player.name }</span>
                </p>
                <p>
                  <span className="label">Score: </span>
                  <span data-testid={ `player-score-${index}` }>{ player.score }</span>
                </p>
              </li>
            )) }
          </ol>
        ) }
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Back to start
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
