import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import storeProvider from './storeProvider';

class SearchBar extends Component {
  state = { searchTerm: '' };

  doSearch = debounce(() => {
    this.props.store.setSearchTerm(this.state.searchTerm);
  }, 500);

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.doSearch();
    });
  };

  render() {
    return (
      <div>
        <input
          type="search"
          value={this.state.searchTerm}
          placeholder="Search for titles here!"
          onChange={this.handleSearch}
        ></input>
      </div>
    );
  }
}

export default storeProvider()(SearchBar);
