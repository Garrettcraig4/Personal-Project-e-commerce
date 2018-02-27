import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProducts } from "../../ducks/getProducts";

class Store extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    console.log(this.props.products);

    return (
      <div className="Store">
        {/* <p>
          "OOPS LOOKS LIKE THERE ARE NO PRODUCTS TO DISPLAY COME BACK A LITTLE
          LATER"
        </p> */}

        <ul>
          {this.props.products.length > 0 &&
            this.props.products.map((products, i) => (
              <div key={i} className="list-item">
                <li>{products.productname}</li>
                <img src={products.productimageurl} />
                <li>{products.productdescription}</li>
                <li>{`$${products.productprice}`}</li>
                <button onClick={() => console.log(this.props.products[i])}>
                  add to cart{" "}
                </button>
              </div>
            ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.product.products
  };
}

export default connect(mapStateToProps, { getProducts })(Store);
