import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class RankingPage extends React.Component {
  renderPlayersList() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    return ranking.sort((a, b) => b.score - a.score)
      .map((player, index) => (
        <li key={ index }>
          <img src={ player.picture } width="50" alt={ `${player.nome}` } />
          <span data-testid={ `player-name-${index}` }>{ player.nome }</span>
          <span data-testid={ `player-score-${index}` }>{ player.score }</span>
        </li>
      ));
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking: </h1>
        <section>
          <ol>
            {this.renderPlayersList()}
          </ol>
        </section>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Tela de login
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.loginReducer.name,
  playerScore: state.mainReducer.score,
  pictureHash: state.loginReducer.hash,
});

export default connect(mapStateToProps)(RankingPage);
