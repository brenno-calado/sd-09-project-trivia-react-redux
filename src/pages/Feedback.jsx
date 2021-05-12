import React from 'react';
import { Link } from 'react-router-dom';
import FeedbackContent from '../components/FeedbackContent';
import PlayerHeaderInfo from '../components/PlayerHeaderInfo';

class Feedback extends React.Component {
  render() {
    return (
      <main>
        <PlayerHeaderInfo />
        <FeedbackContent />
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
      </main>
    );
  }
}

export default Feedback;
