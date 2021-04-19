import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

class Home extends React.Component {
  render() {
    return (
      <>
        <Login />
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            settings
          </button>
        </Link>
      </>
    );
  }
}

export default Home;
