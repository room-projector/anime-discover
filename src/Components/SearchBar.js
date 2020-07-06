import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import storeProvider from './storeProvider';

const styles = {
  bar: {
    margin: '2rem',
    backgroundColor: 'black',
    color: '#4d4dff',
    borderColor: '#4d4dff',
    placeholderColor: '#4d4dff',
    width: '85%',
    marginBottom: '0rem',
  },
};

class SearchBar extends Component {
  state = { searchTerm: '', error: false };

  doSearch = debounce(() => {
    if (this.state.searchTerm.length >= 3) {
      this.setState({ error: false });
    } else {
      this.setState({ error: true });
    }
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
          style={styles.bar}
          className="form-control"
          type="search"
          value={this.state.searchTerm}
          placeholder="Search for titles here!"
          onChange={this.handleSearch}
        ></input>
        {this.state.error ? (
          <div
            style={{ color: 'red', marginLeft: '2rem', marginTop: '0.2rem' }}
          >
            Please three(3) or more characters!
          </div>
        ) : null}
      </div>
    );
  }
}

export default storeProvider()(SearchBar);
