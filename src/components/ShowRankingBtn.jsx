import React from 'react';

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

export default ShowRankingBtn;
