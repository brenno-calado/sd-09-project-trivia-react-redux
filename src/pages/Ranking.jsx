import React from 'react';
import { readFromStorage } from '../services/api';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.playersRankingOrderedByScore = this.playersRankingOrderedByScore.bind(this);
  }

  playersRankingOrderedByScore() {
    const players = readFromStorage('ranking');
    const scores = Object
      .values(
        players
          .sort((a, b) => b.score - a.score),
      );

    return (
      <table>
        <thead>
          <tr>
            <th>
              Nome:
            </th>
            <th>
              Score:
            </th>
            <th>
              Gravatar:
            </th>
          </tr>
        </thead>
        <tbody>
          { scores.map(({ name, score, picture }, index) => (
            <tr key={ index }>
              <td data-testid={ `player-name-${index}` }>
                { name }
              </td>
              <td data-testid={ `player-score-${index}` }>
                { score }
              </td>
              <td>
                <img src={ picture } alt={ `Profile ${name}` } />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        { this.playersRankingOrderedByScore() }
      </section>
    );
  }
}
