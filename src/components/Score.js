import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './Score.module.css';

class Score extends React.Component {
  render() {
    const { score } = this.props;
    return <p className={ style.p } data-testid="header-score">{score}</p>;
  }
}

const mapStateToProps = (state) => ({
  score: state.user.score,
});

Score.propTypes = {
  score: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Score);
