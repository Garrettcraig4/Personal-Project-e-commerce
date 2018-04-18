import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import w from "../../assets/logo-stripe.png";
import card from "../../assets/Credit_Card-512.png";
import "./Home.css";
import drone from "../../assets/69-512.png";
import packageimg from "../../assets/Supplies-512.png";
class Home extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     test: ""
  //   };
  // }

  // componentDidMount() {
  //   axios.get(`/api/test`).then(results => {
  //     this.setState({
  //       test: results.data
  //     });
  //   });
  // }

  render() {
    // const test = this.state.test;

    return (
      <div className="Home">
        {/* {test} */}
        <div className="homeboxone">
          <h1>
            Hello Welcome to Garrett's Online Rolex Dealer We make it easy to
            buy Rolex online no in store pickup needed
          </h1>

          <h1>
            <Link to="/Store"> Shop Now! </Link>
          </h1>
          <div className="homeboxtwo">
            <p> Why You Should Choose G.O.R.D!</p>
          </div>
        </div>
        <div className="homeboxthree">
          <p> World Class Simple Checkout </p>
        </div>
        <img className="homeimg" src={card} />
        <div className="homeboxfour">
          <p> Luxurious Delivery </p>
        </div>

        <img className="homeimg" src={drone} />
        <div className="homeboxfive">
          <p>State Of The Art Packaging</p>
        </div>
        <img className="homeimg" src={packageimg} />
        <footer>
          <div className="footer">
            <Link to="/About">
              <a> about </a>
            </Link>
          </div>
        </footer>
      </div>
    );
  }
}
export default Home;
