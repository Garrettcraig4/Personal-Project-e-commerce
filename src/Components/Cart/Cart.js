import React, { Component } from "react";
import axios from "axios";
import "./Cart.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserCart, getTotalFromUserCart, getUser } from "../../ducks/cart";
import Order from "../Order/Order";
import historyicon from "../../assets/noun_281242_cc.png";
import swal from "sweetalert";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.handelClick = this.handelClick.bind(this);
  }
  componentDidMount() {
    this.props.getUser();

    if (this.props.user) {
      this.props.getUserCart();
      this.props.getTotalFromUserCart();
    } else {
      swal("You have To Login To Access Cart");
      this.props.history.push(`/Auth`);
    }
  }
  handelClick(product) {
    axios.post(`/api/deletefromcart`, { product }).then(results => {
      this.props.getUserCart();
      this.props.getTotalFromUserCart();
    });
  }

  render() {
    return (
      <div className="Cart">
        <div>
          <Link to="/OrderHistory">
            <button className="cartbutton" id="cartorderh">
              {/* <img className="historyicon" src={historyicon} /> */}
              Order History
            </button>
          </Link>
        </div>
        <div className="cartboxone">
          <h1> {`${this.props.user}'s Cart`} </h1>
        </div>
        <p className="itemofcart">
          {this.props.cart.length > 0 &&
            this.props.cart.map((cart, i) => (
              <div key={i} className="list-item">
                <div className="cartboxtwo">
                  <h1>{cart.id && cart.productname}</h1>
                </div>
                <div className="cartboxthree">
                  <p>{cart.description}</p>
                </div>
                <img className="cartimg" src={cart.productimageurl} />
                <div className="cartboxfour">
                  <p>{`$${cart.productprice}`}</p>
                </div>
                <button
                  className="cartbutton"
                  onClick={() => this.handelClick(this.props.cart[i])}
                >
                  remove from cart{" "}
                </button>
              </div>
            ))}
        </p>
        <div className="cartboxfive">
          <p> Total: {`$${this.props.total}`} </p>
        </div>

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
    total: state.cart.total,
    user: state.cart.user
  };
}

export default connect(mapStateToProps, {
  getUserCart,
  getTotalFromUserCart,
  getUser
})(Cart);
