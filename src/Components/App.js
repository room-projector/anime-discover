import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import pickby from 'lodash.pickby';
import PropTypes from 'prop-types';
import AnimeCardList from './AnimeCardList';
import TypeHandler from './TypeHandler';

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
      nextState.searchTerm !== this.state.searchTerm ||
      nextState.episode !== this.state.episode ||
      nextState.movie !== this.state.movie
    );
  }

  appState = () => {
    const { animes, searchTerm, episode, movie } = this.props.store.getState();
    return { animes, searchTerm, episode, movie };
  };

  state = this.appState();

  render() {
    let { animes, episode, movie } = this.state;

    //const searchRE = new RegExp(searchTerm, 'i');
    animes = pickby(animes, (value) => {
      if (episode && movie) {
        return animes;
      } else if (episode && !movie) {
        return (
          value.type.match('TV') ||
          value.type.match('Special') ||
          value.type.match('OVA') ||
          value.type.match('ONA')
        );
      } else if (!episode && movie) {
        return value.type.match('Movie');
      } else {
        return value.type.match('none');
      }
    });

    //filter anime by media type?
    return (
      <div
        className="App"
        style={{
          height: '142rem',
          backgroundColor: '#010048',
          bottom: '0px',
        }}
      >
        <div
          className="jumbotron"
          style={{
            backgroundColor: '#03002e',
          }}
        >
          <h1 style={{ marginBottom: '2rem', fontSize: '300%' }}>
            Anime Discoverer!
          </h1>
          <div>
            Discover new anime! Type it out in the search! Press episodes for
            episodic anime and movies for movies!
          </div>
        </div>
        <SearchBar />
        <TypeHandler />
        <AnimeCardList animes={animes} />
        <div
          style={{
            color: 'silver',
            marginLeft: '2rem',
            bottom: '0px',
          }}
        >
          This is a React search app that pulls data from a restful api based on
          MyAnimeList.com. Check out their API{' '}
          <a href="https://jikan.moe/?fbclid=IwAR1Evre_JQu1TfszBuYJ4-qVqjFb709mnWiaGmJ5QHQAG257BhmOxZcGpN0">
            here
          </a>
        </div>
      </div>
    );
  }
}

export default App;
