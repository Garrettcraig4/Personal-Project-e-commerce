import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

//  import STRIPE_PUBLISHABLE from "../../../server/stripe";
//  import PAYMENT_SERVER_URL from "../../../server/index";
const STRIPE_PLUBLISHABLE = "pk_test_EqUWmF6QnfU1YKr2vzztVLuN";
const PAYMENT_SERVER_URL = "/api/Pay";
const CURRENCY = "USD";

const fromUsdCent = amount => amount * 100;

class Order extends Component {
  successPayment = data => {
    alert("Payment Success!");
  };

  errorPayment = data => {
    alert("OOPS payment error");
  };

  onToken = (amount, description) => token =>
    axios
      .post(PAYMENT_SERVER_URL, {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromUsdCent(amount)
      })
      .then(response => {
        console.log(response);
      });
  render() {
    const { name, description, amount } = this.props;
    return (
      <StripeCheckout
        name={name}
        description={description}
        amount={fromUsdCent(amount)}
        token={this.onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PLUBLISHABLE}
      />
    );
  }
}
export default Order;
