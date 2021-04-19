import React from 'react';
import { Link } from 'react-router-dom';

class ShowRankingBtn extends React.Component {
  render() {
    return (
      <Link to="/ranking">
        <button type="button" data-testid="btn-ranking">
          Ver Ranking
        </button>
      </Link>
    );
  }
}

export default ShowRankingBtn;
