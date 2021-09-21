import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "line 7, collection.component.jsx, CollectionPage, collection prop:",
      collection
    );
  }

  return (
    <div className='collection-page'>
      <h1 className='title'>{collection.title}</h1>
      <div className='items'>
        {collection.items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, { match: { params } }) => ({
  collection: selectCollection(params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
