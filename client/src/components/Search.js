import React from 'react';

const Search = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleFormSearch(e.target[0].value);
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="searchForm">
        <input type="text" placeholder="Search..." className="searchTerm"></input>
        <button className="searchButton">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  )

}

export default Search;