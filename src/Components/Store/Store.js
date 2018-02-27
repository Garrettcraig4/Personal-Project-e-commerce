import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProducts } from "../../ducks/getProducts";

class Store extends Component {
  constructor(props) {
    super(props);
    this.handelClick = this.handelClick.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handelClick(product) {
    console.log(product, "adfadfadsfasdfadsfafff");
    axios.post(`/api/addtocart`, { product }).then(results => {
      console.log(results.data, "onclcikc");
    });
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
                <button
                  onClick={() => this.handelClick(this.props.products[i])}
                >
                  add to cart
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
