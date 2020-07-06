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
      return 'green';
    } else {
      return 'red';
    }
  };

  checkMovieColor = () => {
    if (!this.state.movie) {
      return 'green';
    } else {
      return 'red';
    }
  };

  render() {
    return (
      <div>
        <button
          style={{ backgroundColor: `${this.checkEpisodeColor()}` }}
          onClick={this.handleEpisodesClick}
        >
          Episodes
        </button>
        <button
          style={{ backgroundColor: `${this.checkMovieColor()}` }}
          onClick={this.handleMovieClick}
        >
          Movies
        </button>
      </div>
    );
  }
}

export default storeProvider()(TypeHandler);
