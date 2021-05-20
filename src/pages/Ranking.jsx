import React from 'react';
import BackButton from '../components/BackButton';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <BackButton />
      </div>
    );
  }
}

export default Ranking;
