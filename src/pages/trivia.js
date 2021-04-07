import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../components/header';
import { getQuestions } from '../redux/actions';
import Question from '../components/question';

class trivia extends React.Component {
  constructor(pro) {
    super(pro);
    this.state = {
      index: 0,
      loading: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { propQuestions } = this.props;
    propQuestions()
      .then(() => this.setState({ loading: false }));
  }

  handleClick() {
    const maxIndex = 4;
    const { index } = this.state;
    if (index === maxIndex) {
      this.setState((previousState) => ({ index: previousState.index }));
    } else {
      this.setState((previousState) => ({ index: previousState.index + 1 }));
    }
  }

  render() {
    const { results } = this.props;
    const { index, loading } = this.state;
    const question = results.find((_question, i) => i === index);
    return (
      <div className="App">
        <Header />
        <h1>Trivia</h1>
        {(!loading) && <Question question={ question } />}
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.handleClick }
        >
          Próxima
        </button>
      </div>
    );
  }
}

trivia.propTypes = {
  propQuestions: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ actionsReducer: { token, results } }) => ({
  token,
  results,
});

const mapDispatchToProps = (dispatch) => ({
  propQuestions: () => dispatch(getQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(trivia);
