import React, { Component } from "react";
import axios from "axios";

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

        <h1>Hello Welcome to the Store</h1>
      </div>
    );
  }
}
export default Home;
