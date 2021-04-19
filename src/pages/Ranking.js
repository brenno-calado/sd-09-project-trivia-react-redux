import { MD5 } from 'crypto-js';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Ranking.module.css';

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
        <ul className={ style.list }>
          {Object.values(dataObj).map(({ player }, index) => (
            <li className={ style.item } key={ player.name } data-testid="ranking-title">
              <img
                className={ style.img }
                alt="perfil-Gravatar"
                src={ `https://www.gravatar.com/avatar/${MD5(player.gravatarEmail).toString()}?s=50` }
              />
              <span className={ style.name } data-testid={ `player-name-${index}` }>
                {player.name}
              </span>
              <span className={ style.score } data-testid={ `player-score-${index}` }>
                Score:&nbsp;
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
      <Link className={ style.link } to="/">
        <button className={ style.button } type="button" data-testid="btn-go-home">
          Jogar novamente
        </button>
      </Link>
    );
  }

  render() {
    return (
      <main>
        <span className={ style.title }>Ranking</span>
        {this.renderUserList()}
        {this.renderButtonReplay()}
      </main>
    );
  }
}

export default Ranking;
