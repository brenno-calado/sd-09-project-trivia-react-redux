import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ShowRankingBtn from '../components/ShowRankingBtn';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRanking: false,
    };

    this.handleClikShowRankingBtn = this.handleClikShowRankingBtn.bind(this);
  }

  handleClikShowRankingBtn() {
    this.setState({ showRanking: true });
  }

  render() {
    const { showRanking } = this.state;
    return (
      <div>
        <Header />
        <ShowRankingBtn onclick={ this.handleClikShowRankingBtn } />
        {showRanking && <Redirect to="/ranking" />}
      </div>
    );
  }
}

export default Feedback;
