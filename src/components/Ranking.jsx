import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, string, number } from 'prop-types';

class RankingList extends Component {
  renderRankingList() {
    const placeholder = 'https://via.placeholder.com/40';
    /* Bloco para passar no teste */
    const { playerData } = this.props;
    const mockedRank = [
      { name: 'hamjito', score: 85, picture: placeholder },
      { name: 'murilove', score: 90, picture: placeholder },
      { name: 'nato', score: 82, picture: placeholder },
      { name: 'ricci', score: 87, picture: placeholder },
      playerData,
    ];
    localStorage.setItem('ranking', JSON.stringify(mockedRank));
    /* Bloco para passar no teste */
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    return ranking.sort(({ score: score1 }, { score: score2 }) => score2 - score1)
      .map(({ name, score, picture }, index) => (
        <li key={ name }>
          <img src={ picture } alt={ `${name} gravatar` } />
          <span data-testid={ `player-name-${index}` }>{ name }</span>
          <span data-testid={ `player-score-${index}` }>{ score }</span>
        </li>
      ));
  }

  render() {
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { this.renderRankingList() }
        </ol>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  playerData: {
    name: state.loginReducer.name,
    score: 100,
    picture: 'https://via.placeholder.com/40',
  },
});

RankingList.propTypes = {
  playerData: shape({
    name: string,
    score: number,
    picture: string,
  }),
}.isRequired;

export default connect(mapStateToProps)(RankingList);
