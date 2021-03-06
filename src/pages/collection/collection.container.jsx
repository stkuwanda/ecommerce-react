import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsFetchingCollections } from "../../redux/shop/shop.selectors";
import CollectionPage from "./collection.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetchingCollections,
});

const CollectionContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionPage);

export default CollectionContainer;
