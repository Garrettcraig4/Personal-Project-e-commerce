import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUserOrder } from "../../ducks/cart";
class Orderhistory extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUserOrder();
  }
  render() {
    return (
      <div className="Orderhistory">
        <p>Order history!</p>
        <p>
          {this.props.cart.order.length > 0 &&
            this.props.cart.order.map((order, i) => (
              <div key={i} className="list-item">
                <div className="orderboxtwo">
                  <h1>{order.id && order.productname}</h1>
                </div>
                <div className="orderboxthree">
                  <p>{order.description}</p>
                </div>
                {/* <img src={order.productimageurl} /> */}
                <div className="orderboxfour">
                  <p>{`$${order.productprice}`}</p>
                </div>
              </div>
            ))}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getUserOrder })(Orderhistory);
