import React, { Component } from "react";
import axios from "axios";
import "./Cart.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserCart, getTotalFromUserCart } from "../../ducks/cart";
import Order from "../Order/Order";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.handelClick = this.handelClick.bind(this);
  }
  componentDidMount() {
    this.props.getUserCart();
    this.props.getTotalFromUserCart();
  }

  handelClick(product) {
    console.log(product, "a4353453453454354");
    axios.post(`/api/deletefromcart`, { product }).then(results => {
      console.log(results.data, "oncl43434cikc");
      this.props.getUserCart();
      this.props.getTotalFromUserCart();
    });
  }

  render() {
    console.log(this.props);

    return (
      <div className="Cart">
        <h1> WELCOME TO YOUR CART </h1>

        <ul>
          {this.props.cart.length > 0 &&
            this.props.cart.map((cart, i) => (
              <div key={i} className="list-item">
                <li>{cart.id && cart.productname}</li>
                <li>{cart.description}</li>
                <img src={cart.productimageurl} />
                <li>{`$${cart.productprice}`}</li>
                <button onClick={() => this.handelClick(this.props.cart[i])}>
                  remove from cart{" "}
                </button>
              </div>
            ))}
        </ul>

        <p> Total: {`$${this.props.total}`} </p>

        <Order
          name={"Garrett's Online Rolex Dealer"}
          description={"Your Order"}
          amount={this.props.total}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    total: state.cart.total
  };
}

export default connect(mapStateToProps, { getUserCart, getTotalFromUserCart })(
  Cart
);
