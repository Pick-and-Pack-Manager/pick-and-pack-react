// Importing libraries, CSS and Components.

import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "Login";
import Order from "Order";
import Orders from "Orders";
import Shipmetn from "Shipment";

// Route rendering to the different URL Components
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/">
        <LogIn />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/orders">
        <Orders />
      </Route>
      <Route path="/order/packing/:id">
        <OrderPacking />
      </Route>
      <Route path="/order/shipment/:id">
        <OrderShipment />
      </Route>
    </div>
  </Router>,
  node
);

class App extends React.Component {
  state = {};
  // DO I NEED TO RENDER HERE IN THE APP? OR THE ROUTE TAKES CARE OF THAT?
}

export default App;
