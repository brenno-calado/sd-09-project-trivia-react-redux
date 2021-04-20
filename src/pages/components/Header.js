import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { getUserImage } from '../../redux/actions';
import '../../styles/components/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gravatarUrl: '',
    };
    this.convertEmail = this.convertEmail.bind(this);
  }

  componentDidMount() {
    const { email } = this.props;
    const url = md5(email).toString();
    this.convertEmail(url);
  }

  convertEmail(url) {
    const { dispatchImageUrl } = this.props;
    this.setState({ gravatarUrl: url });
    dispatchImageUrl(url);
  }

  render() {
    const { name, player } = this.props;
    const { score } = player;
    const { gravatarUrl } = this.state;
    return (
      <header className="header-container">
        <div>
          <p>
            <span className="text-label">Nome: </span>
            <span data-testid="header-player-name">{ name }</span>
          </p>
          <p>
            <span className="text-label">Score: </span>
            <span data-testid="header-score">{ score }</span>
          </p>
        </div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatarUrl}` }
          alt="gravatar"
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginUser.name,
  email: state.loginUser.email,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchImageUrl: (url) => dispatch(getUserImage(url)),
});

Header.propTypes = {
  name: PropTypes.string,
  dispatchImageUrl: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
