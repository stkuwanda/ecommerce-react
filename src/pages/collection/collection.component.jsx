import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
import "./collection.styles.scss";
import CustomButton from "../../components/custom-button/custom-button.component";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionPage = ({ collection, fetchCollections }) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "line 10, collection.component.jsx, CollectionPage, collection prop:",
      collection
    );
  }

  return !collection ? (
    <div
      style={{
        height: "60vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomButton onClick={() => fetchCollections()}>Retry</CustomButton>
    </div>
  ) : (
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

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
