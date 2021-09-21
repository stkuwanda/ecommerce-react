import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Hw3JTHWu7GuFA4aXH0sYqonNE1OMU4EjarH0uwTWKIfVPfyKjehZnEMzfq7SXR5sGWkZDA0cRWRR1PbEfLS0vZQ00fa3ZOzm6";

  const onToken = (token) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "line 10, stripe-button.component.jsx, StripeCheckoutButto, Token:",
        token
      );
    }
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='ECommerce Ltd'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/aPC.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
