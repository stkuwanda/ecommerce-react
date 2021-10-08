import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import { selectLoadingStatus } from "../../redux/user/user.selectors";
import SignInAndSignUpPage from "./signin-and-signup-page.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingStatus,
});

const SignInAndSignUpContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(SignInAndSignUpPage);

export default SignInAndSignUpContainer;
