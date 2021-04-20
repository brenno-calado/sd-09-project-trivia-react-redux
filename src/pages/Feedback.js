import React from 'react';
// import HeaderFeedback from '../components/HeaderFeedback';
import Header from '../components/Header';
import MessageFeedback from '../components/MessageFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MessageFeedback />
      </div>
    );
  }
}

export default Feedback;
