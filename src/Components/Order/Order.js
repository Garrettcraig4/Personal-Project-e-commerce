// import React, { Component } from "react";
// import axios from "axios";
// import StripeCheckout from "react-stripe-checkout";

// //  import STRIPE_PUBLISHABLE from "../../../server/stripe";
// //  import PAYMENT_SERVER_URL from "../../../server/index";

// const CURRENCY = "USD";

// const fromUsdCent = amount => amount * 100;

// const successPayment = data => {
//   alert("Payment Success!");
// };

// const errorPayment = data => {
//   alert("OOPS payment error");
// };

// const onToken = (amount, description) => token =>
//   axios.post(PAYMENT_SERVER_URL, {
//     description,
//     source: token.id,
//     currency: CURRENCY,
//     ammount: fromUsdCent(amount)
//   });

// const Checkout = ({ name, description, amount }) => (
//   <StripeCheckout
//     name={name}
//     description={description}
//     ammount={fromUsdCent(amount)}
//     token={onToken(amount, description)}
//     currency={CURRENCY}
//     stripeKey={STRIPE_PUBLISHABLE}
//   />
// );

// export default Order;
