import React from 'react';
import { Link } from 'react-router-dom';

class BackButton extends React.Component {
  render() {
    return (
      <Link to="/">
        <button type="button" data-testid="btn-go-home">
          SAIR
        </button>
      </Link>
    );
  }
}

export default BackButton;
