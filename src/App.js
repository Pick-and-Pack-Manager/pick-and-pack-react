// Importing libraries, CSS and Components.

import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Order from "./Order";
import Orders from "./Orders";
import Shipment from "./Shipment";
import Nav from "./NavComponent";
import Profile from "./Profile";

class App extends React.Component {
  state = {};

  // Route rendering
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Orders" component={Orders} />
          <Route path="/order/packing/:id" component={Order} />
          <Route path="/order/shipment/:id" component={Shipment} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
