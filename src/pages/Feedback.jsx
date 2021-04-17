import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import PlayAgainBtn from '../components/PlayAgainBtn';
import FeedbackMsg from '../components/FeedbackMsg';
import FeedbackInfo from '../components/FeedbackInfo';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FeedbackMsg />
        <FeedbackInfo />
        <Link to="/">
          <PlayAgainBtn />
        </Link>
      </div>
    );
  }
}

export default Feedback;
