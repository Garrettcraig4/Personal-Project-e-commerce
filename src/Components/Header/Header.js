import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Header.css";
import noun_354335_cc from "../../assets/noun_354225_cc.png";
import storeicon from "../../assets/noun_512408_cc.png";
import carticon from "../../assets/noun_462143_cc.png";
import loginicon from "../../assets/noun_489250_cc.png";
import { connect } from "react-redux";
import getCart from "../../ducks/index";
import { getUserCart, getUser } from "../../ducks/cart";
class Header extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div className="header-container">
        <div className="Header">
          <Link to="/">
            <button id="homelink">
              <img src={noun_354335_cc} />
              Home
            </button>
          </Link>

          <Link to="/Store">
            <button id="storelink">
              <img src={storeicon} />
              Store
            </button>
          </Link>
          <h1 id="title"> G.O.R.D. </h1>
          <Link to="/Cart">
            <button id="cartlink">
              <img src={carticon} />
              Cart
            </button>
          </Link>

          <Link to="/Auth">
            <button id="login">
              <img src={loginicon} />
              Login
            </button>
          </Link>
        </div>
        <div />
        <div className="username">
          {this.props.user}{" "}
          <p>
            <Link to="/Auth"> Not you?? Click Here</Link>
          </p>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.cart.user
  };
}

export default connect(mapStateToProps, { getCart, getUserCart, getUser })(
  Header
);
