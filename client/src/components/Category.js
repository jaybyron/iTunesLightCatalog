import React from 'react';
import Item from './Item';

const Category = (props) => {

  const items = [];

  if(props.categoryList) {
    props.categoryList.forEach((item) => {
      items.push(<Item key={`item-${item.id}`}itemDetails={item} favorited={props.isFavorited(item.id) ? true: false} 
        removeFromFavorites={props.removeFromFavorites} addToFavorites={props.addToFavorites}></Item>)
    })
  }

  return (
    <div>
      <div className="categoryTitle">
        <h2>Category: {props.categoryName}</h2>
      </div>
      <div className="categoryContainer">
       {items}
      </div>
    </div>
 
  )

}

export default Category;