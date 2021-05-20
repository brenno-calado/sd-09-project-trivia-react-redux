import React from 'react';
import BackMenu from '../components/BackMenu';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <BackMenu />
      </div>
    );
  }
}

export default Ranking;
