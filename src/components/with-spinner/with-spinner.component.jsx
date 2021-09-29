import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// withSpinner is a HOC(Higher Order Component - A component that takes an input component and returns an output component)
const withSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

export default withSpinner;
