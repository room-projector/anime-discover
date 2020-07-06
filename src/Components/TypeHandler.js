import React, { Component } from 'react';
import storeProvider from './storeProvider';

class TypeHandler extends Component {
  state = {
    episode: false,
    movie: false,
  };

  handleEpisodesClick = () => {
    this.setState({ episode: !this.state.episode });
    this.props.store.setEpisode(this.state.episode);
    console.log('click');
  };

  handleMovieClick = () => {
    this.setState({ movie: !this.state.movie });
    this.props.store.setMovie(this.state.movie);
  };

  checkEpisodeColor = () => {
    if (!this.state.episode) {
      return ' #4d4dff';
    } else {
      return 'silver';
    }
  };

  checkMovieColor = () => {
    if (!this.state.movie) {
      return ' #4d4dff';
    } else {
      return 'silver';
    }
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: `${this.checkEpisodeColor()}`,
            margin: '1rem',
            marginLeft: '2rem',
            borderRadius: '12px',
            height: '2rem',
            padding: '0.25rem',
            fontSize: '1rem',
            border: 'none',
          }}
          onClick={this.handleEpisodesClick}
        >
          Episodes
        </button>
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: `${this.checkMovieColor()}`,
            margin: '1rem',
            marginLeft: '0rem',
            borderRadius: '12px',
            height: '2rem',
            padding: '0.25rem',
            fontSize: '1rem',
            border: 'none',
          }}
          onClick={this.handleMovieClick}
        >
          Movies
        </button>
      </div>
    );
  }
}

export default storeProvider()(TypeHandler);
