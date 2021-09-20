import React from "react";
import { withRouter } from "react-router";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, routeName, items, history, match }) => {
  //console.log('line 7, collection-preview.component.jsx, CollectionPreview, otherProps:', otherProps);

  return (
    <div className='collection-preview'>
      <h1
        className='title'
        onClick={() => history.push(`${match.url}/${routeName}`)}
      >
        {title.toUpperCase()}
      </h1>
      <div className='preview'>
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default withRouter(CollectionPreview);
