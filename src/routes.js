import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Auth from "./Components/Auth/Auth";
export default (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={Cart} path="/Cart" />
    <Route component={Auth} path="/Auth" />
  </Switch>
);
