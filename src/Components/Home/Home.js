import React, { Component } from "react";
import axios from "axios";
import w from "../../assets/logo-stripe.png";
import truck from "../../assets/deltruck.png";
import "./Home.css";
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
          <div className="homeboxtwo">
            <p> Why You Should Choose US!</p>
          </div>
        </div>
        <div className="homeboxthree">
          <p> EASY CHECKOUT </p>
        </div>
        <img src={w} />
        <div className="homeboxfour">
          <p> FAST Delivery </p>
        </div>
        <img src={truck} />
      </div>
    );
  }
}
export default Home;
