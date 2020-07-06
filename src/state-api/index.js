import axios from 'axios';
class StateApi {
  constructor(rawData) {
    this.data = {
      animes: this.mapIntoObject(rawData.animes),
      episode: true,
      movie: true,
      searchTerm: '',
    };

    this.subscriptions = {};
    this.lastSubscriptionId = 0;
  }

  subscribe = (cb) => {
    this.lastSubscriptionId++;
    this.subscriptions[this.lastSubscriptionId] = cb;
    return this.lastSubscriptionId;
  };

  unsubscribe = (subscriptionId) => {
    delete this.subscriptions[subscriptionId];
  };

  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach((cb) => cb());
  };

  mergeWithState = (stateChange) => {
    this.data = {
      ...this.data,
      ...stateChange,
    };
    this.notifySubscribers();
  };

  getState = () => {
    return this.data;
  };

  mapIntoObject = (arr) => {
    return arr.reduce((acc, curr) => {
      acc[curr.mal_id] = curr;
      return acc;
    }, {});
  };

  addAnimes = (animes) => {
    this.mergeWithState({
      animes,
    });
  };

  setSearchTerm = async (searchTerm) => {
    this.mergeWithState({
      searchTerm,
    });
    axios
      .get(`https://api.jikan.moe/v3/search/anime?q=${searchTerm}`)
      .then((data) => {
        this.addAnimes(data.data.results);
      });
  };

  setEpisode = (episode) => {
    this.mergeWithState({
      episode,
    });
  };

  setMovie = (movie) => {
    this.mergeWithState({
      movie,
    });
  };
}

export default StateApi;
