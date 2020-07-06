import storeProvider from './storeProvider';
import React from 'react';

const styles = {
  title: { fontSize: '1.25rem', width: '12rem' },
};

class AnimeCard extends React.PureComponent {
  state = {
    hover: false,
  };
  render() {
    const anime = this.props.anime;
    return (
      <a href={anime.url}>
        <button
          className="card"
          style={{
            backgroundColor: 'rgb(0,0,0)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backgroundImage: `url('${anime.image_url}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundBlendMode: 'color-dodge',
            width: '15rem',
            color: 'white',
            padding: '1rem',
            margin: '1rem',
            display: 'inline-block',
            minHeight: '10rem',
          }}
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
        >
          <div style={styles.title}>{anime.title}</div>

          {this.state.hover ? (
            <div>
              <div>{anime.synopsis}</div> Read more{' '}
              <a href={anime.url} style={{ color: 'lightblue' }}>
                here
              </a>
            </div>
          ) : null}
        </button>
      </a>
    );
  }
}

export default storeProvider()(AnimeCard);
