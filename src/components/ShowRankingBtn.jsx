import React from 'react';
import { func } from 'prop-types';

class ShowRankingBtn extends React.Component {
  render() {
    const { onclick } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ onclick }
      >
        Ver Ranking
      </button>
    );
  }
}

ShowRankingBtn.propTypes = {
  onclick: func.isRequired,
};

export default ShowRankingBtn;
