import React from 'react';
import { Link } from 'react-router-dom';

const PlayAgainBtn = () => (
  <Link to="/" className="btn" data-testid="btn-play-again">
    Play again!
  </Link>
);

export default PlayAgainBtn;
