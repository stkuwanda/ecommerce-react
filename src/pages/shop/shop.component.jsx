import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { useDispatch } from "react-redux";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionContainer from "../collection/collection.container";

const ShopPage = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

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

export default ShopPage;
