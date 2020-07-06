import storeProvider from './storeProvider';
import React from 'react';

class AnimeCard extends React.PureComponent {
  render() {
    const anime = this.props.anime;
    return (
      <>
        <div>{anime.title}</div>
        <div>
          <img src={anime.image_url}></img>
        </div>
        <div>
          {anime.synopsis} Read more <a href={anime.url}>here</a>
        </div>
      </>
    );
  }
}

export default storeProvider()(AnimeCard);
