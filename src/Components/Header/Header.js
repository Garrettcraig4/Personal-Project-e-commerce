import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <div className="Home">
        <h1> WELCOME </h1>

        <Link to="/Cart">
          {" "}
          <a id="cart"> Cart </a>{" "}
        </Link>
        <Link to="/Auth">
          {" "}
          <a id="login"> Login/REGITSTER </a>{" "}
        </Link>
      </div>
    );
  }
}
export default Header;
