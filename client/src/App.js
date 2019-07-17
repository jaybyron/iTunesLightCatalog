import React, { Component } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Category from './components/Category';
import Favorites from './components/Favorites';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      results : null,
      searchTerm : '',
      favorites : null,
    }
    this.handleFormSearch = this.handleFormSearch.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.isFavorited = this.isFavorited.bind(this);
    this.checkFavorites = this.checkFavorites.bind(this);
  }

  componentDidMount() {
    if(window.localStorage.favorites) {
      this.setState({favorites : JSON.parse(window.localStorage.favorites)})
    }
  }

  handleFormSearch(searchTerm) {
    if(searchTerm.length > 0) {
      axios.get('http://localhost:8080/search?', {
        params: {
          term: searchTerm
        }
      }).then((response) => {
        const sortedCategories = Object.entries(response.data);
        this.setState({results: sortedCategories, fetched: true});
      })
    }
  }

  addToFavorites(item) {
    if(!window.localStorage.favorites) {
      const favorites = {};
      favorites[item.id] = item;
      window.localStorage.setItem("favorites", JSON.stringify(favorites));
      this.setState({favorites: favorites});
      return;
    } else {
      const favorites = JSON.parse(window.localStorage.favorites);
      if(!favorites[item.id]) {
        favorites[item.id] = item;
        window.localStorage.setItem("favorites", JSON.stringify(favorites));
        this.setState({favorites: favorites});
      } else return;
    }
  }

  removeFromFavorites(item) {
    const favorites = JSON.parse(window.localStorage.favorites);
    delete favorites[item.id];
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
    this.setState({favorites: favorites});
  }

  isFavorited(id) {
    if(this.state.favorites) {
      if(this.state.favorites[id]) {
        return true;
      }
    }
    return false;
  }

  checkFavorites() {
    if(this.state.favorites === null) return false;
    if(Object.keys(this.state.favorites).length >0) return true;
    return false;
  }

  render() {
    let results = [];
    if(this.state.results) {
      this.state.results.forEach((category) => {
        results.push(<Category 
          className="category" 
          key={`category-${category[0]}`} 
          categoryName={category[0]} 
          categoryList={category[1]} 
          addToFavorites={this.addToFavorites} 
          removeFromFavorites={this.removeFromFavorites} 
          isFavorited={this.isFavorited}>
          </Category>);
      });
    }

    return(
      <div className="main">
        <h1 onClick={() => window.location.reload()}><i className="fa fa-apple"></i> iTunes Light</h1>
        <Search 
          handleFormSearch={this.handleFormSearch} 
          handleInput={this.handleInput}>
        </Search>
        {this.checkFavorites() && <Favorites 
          key="favorites" 
          className="category" 
          id="favorites" 
          favoritesList={this.state.favorites}
          removeFromFavorites={this.removeFromFavorites}>
        </Favorites> }
        {results}
      </div>
    );
  }
}


export default App;