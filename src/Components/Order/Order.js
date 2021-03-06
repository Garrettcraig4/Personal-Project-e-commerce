import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import swal from "sweetalert";
import { Link, withRouter } from "react-router-dom";

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
        let newString = JSON.parse(response.request.response);

        swal("Order Confirmed , Thank You for Your Purchase  ");

        this.props.history.push(`/OrderHistory`);
        let tempres = newString.success.source;

        // console.log(tempres.id, "stripe 2 response");

        let tempcity = tempres.address_city;
        let tempaddress = tempres.address_line1;
        let tempstate = tempres.address_state;
        let tempzip = tempres.address_zip;
        let tempcountry = tempres.address_country;
        //post request with values create new endpoint
        // axios.post("/api/adduseraddressinfo", {
        //   tempcity,
        //   tempaddress,
        //   tempstate,
        //   tempzip,
        //   tempcountry
        // });
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
        shippingAddress
        billingAddress={true}
      >
        <button className="cartbutton" id="checkoutbutton" className="button">
          {" "}
          Check Out
        </button>
      </StripeCheckout>
    );
  }
}
export default withRouter(Order);
