import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserCart } from "../../ducks/cart";

class Cart extends Component {
  componentDidMount() {
    // axios.get(`/api/Cart`).then(results => {
    //   console.log(results, "sdfsdfsdfsdfsfsdfsdfsdfsdfsdf");
    //   this.setState({
    //     incart: results.data
    //   });
    // });
    this.props.getUserCart();
  }
  render() {
    // console.log(this.props.cart);
    return (
      <div className="Cart">
        <h1> WELCOME TO YOUR CART </h1>

        <ul>
          {this.props.cart.length > 0 &&
            this.props.cart.map((cart, i) => (
              <div key={i} className="list-item">
                <li>{cart.id && cart.productname}</li>
                <li>{cart.description}</li>
                <li>{`$${cart.productprice}`}</li>
              </div>
            ))}
        </ul>

        <p> Total: </p>
        <Link to="/Checkout">
          <button> Checkout </button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}

export default connect(mapStateToProps, { getUserCart })(Cart);
