import { MD5 } from 'crypto-js';
import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();

    this.renderUserList = this.renderUserList.bind(this);
  }

  renderUserList() {
    if (localStorage.getItem('ranking')) {
      const dataObj = JSON.parse(localStorage.getItem('ranking'))
        .sort((a, b) => (b.player.score) - (a.player.score));
      return (
        <ul>
          {Object.values(dataObj).map(({ player }, index) => (
            <li key={ player.name } data-testid="ranking-title">
              <img
                alt="perfil-Gravatar"
                src={ `https://www.gravatar.com/avatar/${MD5(player.gravatarEmail).toString()}?s=50` }
              />
              <span data-testid={ `player-name-${index}` }>
                {player.name}
              </span>
              <span data-testid={ `player-score-${index}` }>
                Score:
                {player.score}
              </span>
            </li>
          ))}
        </ul>
      );
    }
  }

  renderButtonReplay() {
    return (
      <Link to="/">
        <button type="button" data-testid="btn-go-home">
          Jogar novamente
        </button>
      </Link>
    );
  }

  render() {
    return (
      <main>
        {this.renderUserList()}
        {this.renderButtonReplay()}
      </main>
    );
  }
}

export default Ranking;
