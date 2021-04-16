import React from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends React.Component {
  componentDidUpdate({ score: prevScore }) {
    const { userName, gravatarEmail, assertions, score: currScore } = this.props;
    if (prevScore !== currScore) {
      localStorage.setItem('state', JSON.stringify({
        player: {
          name: userName,
          assertions,
          score: currScore,
          gravatarEmail,
        },
      }));
    }
  }

  render() {
    const { userName, gravatarEmail, score } = this.props;

    return (
      <header>
        <img
          src={ gravatarEmail }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  userEmail: state.loginReducer.email,
  gravatarEmail: state.loginReducer.gravatarEmail,
  score: state.scoreReducer.score,
  assertions: state.scoreReducer.assertions,
});

Header.propTypes = {
  userName: string,
  userEmail: string,
  gravatarEmail: string,
  score: number,
  assertions: number,
}.isRequired;

export default connect(mapStateToProps)(Header);
