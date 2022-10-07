// Importing libraries, CSS and Components.
import axios from "axios";
import "./App.css";
import React from "react";
// import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from "./login";
import Order from "./order";
import Orders from "./orders";
import Shipment from "./shipment";
import Nav from "./navComponent";
import Profile from "./profile";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = {
    orders: [],
		user: {},
		loggedIn: false
  };
	// {/*This retrieves all the orders from the backend, we will filter here maybe, if there are not to much. Maybe we can call only OPEN orders from backend/DB*/}
  readOrders = async () => {
    let orders = await axios.get(process.env.REACT_APP_API_URL + "/orders");
    this.setState({
      orders: orders,
    });
  }
	searchUser = async (user, e) => {
			let searched = await axios.post(`http://localhost:4420/login`, {user}, {withCredentials: true})
				console.log(searched.data)
				this.setState(
					{
						user: searched.data.user,
						error: searched.data.error,
						loggedIn: searched.data.loggedIn
				})
  }
  // Route rendering. I put the packing and Shipment middle route just to have a more clear vision on the URL
  render() {
		console.log(this.state.loggedIn)
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Login searchUser={this.searchUser} error={this.state.error} loggedIn={this.state.loggedIn} />} />
          <Route path="/profile" component={Profile} />
          <Route path="/orders" component={Orders} />
          <Route path="/order/packing/:id" component={Order} />
          <Route path="/order/shipment/:id" component={Shipment} />
        </Switch>
      </Router>
    );
  }
}

export default App;
