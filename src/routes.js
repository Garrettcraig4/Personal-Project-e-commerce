import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Auth from "./Components/Auth/Auth";
import Store from "./Components/Store/Store";
import CheckOut from "./Components/CheckOut/CheckOut";
import Order from "./Components/Order/Order";
import Orderhistory from "./Components/Orderhistory/Orderhistory";
import About from "./Components/About/About";
export default (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={Cart} path="/Cart" />
    <Route component={Auth} path="/Auth" />
    <Route component={Store} path="/Store" />
    <Route component={CheckOut} path="/Checkout" />
    <Route component={Orderhistory} path="/OrderHistory" />
    <Route component={About} path="/About" />
  </Switch>
);
