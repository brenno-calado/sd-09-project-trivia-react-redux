import React from 'react';
import Header from '../components/Header';
import FeedbackMsg from '../components/FeedbackMsg';
import FeedbackInfo from '../components/FeedbackInfo';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FeedbackMsg />
        <FeedbackInfo />
      </div>
    );
  }
}

export default Feedback;
