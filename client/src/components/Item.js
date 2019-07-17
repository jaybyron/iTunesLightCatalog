import React from 'react';

const Item = (props) => {

  const {art, genre, id, trackName, url} = props.itemDetails;
  const runFavoriteFunction = () => {
    if(props.favorited) {
      props.removeFromFavorites(props.itemDetails);
    } else {
      props.addToFavorites(props.itemDetails)
    }
  }

  return (
    <div className="item" id={`track-name-${id}`}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={art} alt="trackName"/>
      </a>
      <p>{trackName}</p>
      <p>{id}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">view on iTunes Store</a>
      <p>{genre}</p>
      <button onClick={(event) => runFavoriteFunction()}>{props.favorited ? 'Remove Favorite' : 'Favorite'}</button>
    </div>
  )

}

export default Item;