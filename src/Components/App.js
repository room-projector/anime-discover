import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import pickby from 'lodash.pickby';
import PropTypes from 'prop-types';
import AnimeCardList from './AnimeCardList';

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object,
  };

  getChildContext() {
    return { store: this.props.store };
  }

  onStoreChange = () => {
    this.setState(this.appState);
  };

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.animes !== this.state.animes ||
      nextState.searchTerm !== this.state.searchTerm
    );
  }

  appState = () => {
    const { animes, searchTerm } = this.props.store.getState();
    return { animes, searchTerm };
  };

  state = this.appState();

  render() {
    let { animes } = this.state;
    //filter anime by media type?
    return (
      <div className="App">
        <h1>Stay hydradted kids heres my header change ltr</h1>
        <SearchBar />
        <AnimeCardList animes={animes} />
      </div>
    );
  }
}

export default App;
