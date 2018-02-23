import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
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
