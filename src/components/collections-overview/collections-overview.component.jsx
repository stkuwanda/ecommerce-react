import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollections } from "../../redux/shop/shop.selectors";
import "./collections-overview.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionsOverview = ({ collections, fetchCollections }) => {
  return collections.length ? (
    <div className='collection-overview'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  ) : (
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
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollectionsStart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsOverview);
