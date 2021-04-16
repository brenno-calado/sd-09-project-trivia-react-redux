import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.renderRankingList = this.renderRankingList.bind(this);
  }

  renderRankingList() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    if (rankingList) {
      return (
        <ul>
          { rankingList.sort((a, b) => b.score - a.score).map((user, index) => (
            <li key={ index }>
              <img src={ user.picture } alt={ user.name } />
              <span data-testid={ `player-name-${index}` }>{ user.name }</span>
              <span data-testid={ `player-score-${index}` }>{ user.score }</span>
            </li>
          )) }
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">RANKING</h1>
        { this.renderRankingList() }
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
