import React from 'react';
import logo from '../trivia.png';

class Logotipo extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            Loading...
          </p>
        </header>
      </div>
    );
  }
}

export default Logotipo;
