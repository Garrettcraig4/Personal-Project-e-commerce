import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProducts } from "../../ducks/getProducts";
import swal from "sweetalert";
import "./Store.css";
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
      console.log(
        results.data,
        swal(product.productname, "Was added to your cart")
      );
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
        <div className="storeboxzero">
          <h1> Store</h1>
        </div>
        {this.props.products.length > 0 &&
          this.props.products.map((products, i) => (
            <div key={i} className="list-item">
              <div className="storeboxone">
                <h1>{products.productname}</h1>
              </div>
              <img src={products.productimageurl} />
              <div className="storeboxtwo">
                <p>{products.productdescription}</p>
              </div>
              <div className="storeboxthree">
                <p id="productprice">{`$${products.productprice}`}</p>
              </div>

              <button
                id="addtocart"
                onClick={() => this.handelClick(this.props.products[i])}
              >
                add to cart
              </button>
            </div>
          ))}
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
