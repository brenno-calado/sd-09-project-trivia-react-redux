import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
<<<<<<< HEAD
import PlayAgainBtn from '../components/PlayAgainBtn';
=======
import FeedbackMsg from '../components/FeedbackMsg';
import FeedbackInfo from '../components/FeedbackInfo';
>>>>>>> 66ab3547e1238f365ff60c45705e2aa302ca75cf

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
<<<<<<< HEAD
        <Link to="/">
          <PlayAgainBtn />
        </Link>
=======
        <FeedbackMsg />
        <FeedbackInfo />
>>>>>>> 66ab3547e1238f365ff60c45705e2aa302ca75cf
      </div>
    );
  }
}

export default Feedback;
