import React from 'react';
import { Link } from 'react-router-dom';
import style from './ButtonSettings.module.css';

class ButtonSettings extends React.Component {
  render() {
    return (
      <Link to="/settings">
        <button
          className={ style.button }
          data-testid="btn-settings"
          type="button"
        >
          Settings
        </button>
      </Link>
    );
  }
}

export default ButtonSettings;
