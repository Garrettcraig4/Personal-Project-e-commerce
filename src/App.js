import React, { Component } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import { Link } from "react-router-dom";
import routes from "./routes";
import Order from "./Components/Order/Order";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* <Order name={"the test"} description={"2nd test"} amount={2} /> */}

        {routes}
      </div>
    );
  }
}

export default App;
