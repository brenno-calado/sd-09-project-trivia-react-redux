import React from 'react';
import { Link } from 'react-router-dom';

import ShowRankingBtn from '../components/ShowRankingBtn';
import Header from '../components/Header';
import PlayAgainBtn from '../components/PlayAgainBtn';
import FeedbackMsg from '../components/FeedbackMsg';
import FeedbackInfo from '../components/FeedbackInfo';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FeedbackMsg />
        <FeedbackInfo />
        <Link to="/ranking">
          <ShowRankingBtn />
        </Link>
        <Link to="/">
          <PlayAgainBtn />
        </Link>
      </>
    );
  }
}

export default Feedback;
