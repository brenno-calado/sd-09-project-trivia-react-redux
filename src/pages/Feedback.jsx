import React from 'react';
import Header from '../components/Header';
import FeedbackMsg from '../components/FeedbackMsg';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FeedbackMsg />
      </div>
    );
  }
}

export default Feedback;
