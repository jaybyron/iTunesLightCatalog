import React from 'react';
import Item from './Item';

const Favorites = (props) => {

  let favorites;

  if(!props.favoritesList) {
    favorites = <p>Favorites Empty</p>
  } else {
    favorites = [];
    Object.values(props.favoritesList).forEach((item) => {
      favorites.push(<Item key={`item-${item.id}`}itemDetails={item} favorited={true} removeFromFavorites={props.removeFromFavorites}></Item>)
    })
  }
 

  return(
    <div>
      <h2>Favorites</h2>
      <div className="categoryContainer">
        {favorites}
      </div>
    </div>

  )
}

export default Favorites;