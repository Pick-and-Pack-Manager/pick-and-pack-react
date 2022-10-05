// Importing libraries, CSS and Components.
import axios from "axios";
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
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = {
    orders: [],
  };
	{/*This retrieves all the orders from the backend, we will filter here maybe, if there are not to much. Maybe we can call only OPEN orders from backend/DB*/}
  readOrders = async () => {
    let orders = await axios.get(process.env.REACT_APP_API_URL + "/orders");
    this.setState({
      orders: orders,
    });
  };

  // Route rendering. I put the packing and Shipment middle route just to have a more clear vision on the URL
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
