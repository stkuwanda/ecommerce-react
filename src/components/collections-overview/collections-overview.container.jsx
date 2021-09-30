import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import withSpinner from "../with-spinner/with-spinner.component";
import { selectIsFetchingCollections } from "../../redux/shop/shop.selectors";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetchingCollections,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
