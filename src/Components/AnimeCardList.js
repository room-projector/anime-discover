import React from 'react';
import AnimeCard from './AnimeCard';

export default class AnimeCardList extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#010048',
          display: 'center',
          marginLeft: '1rem',
        }}
      >
        {Object.values(this.props.animes).map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    );
  }
}
