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
		user: {},
		loggedIn: false,
		emailService: '@test.com'
  };
	// {/*This retrieves all the orders from the backend, we will filter here maybe, if there are not to much. Maybe we can call only OPEN orders from backend/DB*/}
  readOrders = async () => {
    let orders = await axios.get(process.env.REACT_APP_API_URL + "/orders");
    this.setState({
      orders: orders,
    });
  }
	searchUser = async (user, e) => {
		sessionStorage.clear()
		localStorage.clear()
			let searched = await axios.post(`http://localhost:4420/login`, {user}, {withCredentials: true})
				this.setState(
					{
						user: searched.data.user,
						error: searched.data.error,
						loggedIn: searched.data.loggedIn
				})
				localStorage.setItem("storedAccess", searched.data.user.permission)
				localStorage.setItem("userFullName", searched.data.user.fullName)
				localStorage.setItem("userFirstName", searched.data.user.firstName)
				localStorage.setItem("userLastName", searched.data.user.lastName)
				localStorage.setItem("userId", searched.data.user.id)
				localStorage.setItem("userEmail", searched.data.user.email)
				localStorage.setItem("emailService", this.state.emailService)
  }
  // Route rendering. I put the packing and Shipment middle route just to have a more clear vision on the URL
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Login searchUser={this.searchUser} error={this.state.error} loggedIn={this.state.loggedIn} emailService={this.state.emailService}/>} />
          <Route path="/profile" component={Profile} />
          <Route path="/orders" component={Orders} loggedIn={this.state.loggedIn}/>
          <Route path="/order/packing/:id" component={Order} />
          <Route path="/order/shipment/:id" component={Shipment} />
        </Switch>
      </Router>
    );
  }
}

export default App;
