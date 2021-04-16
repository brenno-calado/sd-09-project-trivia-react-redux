import React from 'react';
import FeedbackContent from '../components/FeedbackContent';
import PlayerHeaderInfo from '../components/PlayerHeaderInfo';

class Feedback extends React.Component {
  render() {
    return (
      <main>
        <PlayerHeaderInfo />
        <FeedbackContent />
      </main>
    );
  }
}

export default Feedback;
