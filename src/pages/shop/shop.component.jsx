import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionContainer from "../collection/collection.container";

const ShopPage = ({ fetchCollections, match }) => {
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  if (process.env.NODE_ENV === "development") {
    console.log("line 23, shop.component.jsx, ShopPage, Match object:", match);
  }

  return (
    <div className='shop-page'>
      <Route exact path={match.path} component={CollectionsOverviewContainer} />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
