import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import storeNewSettings from '../actions/settings';
import style from './Settings.module.css';

const DIFFICULTY_OPTIONS = [
  {
    id: '',
    name: 'Any Difficulty',
  },
  {
    id: 'easy',
    name: 'Easy',
  },
  {
    id: 'medium',
    name: 'Medium',
  },
  {
    id: 'hard',
    name: 'Hard',
  },
];

const TYPE_OPTIONS = [
  {
    id: '',
    name: 'Any Type',
  },
  {
    id: 'multiple',
    name: 'Multiple Choice',
  },
  {
    id: 'boolean',
    name: 'True / False',
  },
];

class Settings extends React.Component {
  constructor({ settings }) {
    super();
    this.state = {
      options: {
        difficulty: DIFFICULTY_OPTIONS,
        type: TYPE_OPTIONS,
        category: [],
      },
      settings,
      isFetching: false,
    };
    this.getCategories = this.getCategories.bind(this);
    this.renderSelectionFor = this.renderSelectionFor.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.onChangeSetting = this.onChangeSetting.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  componentWillUnmount() {
    const { saveSettings } = this.props;
    const { settings } = this.state;
    saveSettings(settings);
  }

  onChangeSetting({ target: { name: setting, value } }) {
    this.setState(({ settings }) => ({
      settings: { ...settings, [setting]: value },
    }));
  }

  async getCategories() {
    this.setState({ isFetching: true });
    const request = await fetch('https://opentdb.com/api_category.php');
    const { trivia_categories: categories } = await request.json();
    const anyCategoryObj = {
      id: '',
      name: 'Any Category',
    };
    this.setState((currentState) => (
      {
        options: {
          ...currentState.options,
          category: [anyCategoryObj, ...categories],
        },
        isFetching: false,
      }
    ));
  }

  renderSelectionFor(setting) {
    const { options: { [setting]: options } } = this.state;
    const { settings: { [setting]: value } } = this.state;
    return (
      <select
        className={ style.select }
        name={ setting }
        key={ setting }
        value={ value }
        onChange={ this.onChangeSetting }
      >
        { options.map(({ id, name }) => (
          <option value={ id } key={ name }>{ name }</option>
        )) }
      </select>
    );
  }

  renderSettings() {
    const { options, settings } = this.state;
    const selections = Object.keys(options);
    return (
      <>
        <input
          className={ style.number }
          type="number"
          name="amount"
          value={ settings.amount }
          onChange={ this.onChangeSetting }
        />
        { selections.map((setting) => this.renderSelectionFor(setting)) }
      </>
    );
  }

  renderBackHome() {
    return (
      <Link className={ style.link } to="/">
        <button className={ style.button } type="button" data-testid="btn-play-again">
          Tela Login
        </button>
      </Link>
    );
  }

  render() {
    const { isFetching } = this.state;
    return (
      <div className={ style.div }>
        <h1 className={ style.title } data-testid="settings-title">Settings</h1>
        { !isFetching && this.renderSettings() }
        { this.renderBackHome() }
      </div>
    );
  }
}

const mapDispatchToProps = {
  saveSettings: storeNewSettings,
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
  saveSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    type: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
};
