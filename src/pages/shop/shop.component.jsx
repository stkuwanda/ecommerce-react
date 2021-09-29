import React from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsFetchingCollections } from "../../redux/shop/shop.selectors";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import { connect } from "react-redux";

// Creating Wrapped Components
const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    this.props.fetchCollections();
  }

  render() {
    const { match, isFectching } = this.props;

    if (process.env.NODE_ENV === "development") {
      console.log(
        "line 25, shop.component.jsx, ShopPage, Match object:",
        match
      );
    }

    return (
      <div className='shop-page'>
        <Route
          exact
          path={match.path}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={isFectching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={isFectching} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFectching: selectIsFetchingCollections,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
