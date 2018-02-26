import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class CheckOut extends Component {
  render() {
    return (
      <div className="CheckOut">
        <p> Payment methond </p>
        <Link to="/Order">
          <button> Place Order</button>
        </Link>
      </div>
    );
  }
}
export default CheckOut;
