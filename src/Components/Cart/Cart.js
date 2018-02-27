import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Cart extends Component {
  render() {
    return (
      <div className="Cart">
        <h1> WELCOME TO YOUR CART </h1>

        <ul>
          {this.props.incart.map((cart, i) => {
            return (
              <div key={i} className="list-item">
                <li>{cart}</li>
              </div>
            );
          })}
        </ul>

        <div />

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
    incart: state.cart
  };
}

export default connect(mapStateToProps)(Cart);
