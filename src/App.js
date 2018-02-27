import React, { Component } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import { Link } from "react-router-dom";
import routes from "./routes";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        {routes}
      </div>
    );
  }
}

export default App;
