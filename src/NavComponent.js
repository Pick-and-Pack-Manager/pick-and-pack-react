import React from "react";
import "./App.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

class Nav extends React.Component {
  state = {}
	logOut = async (e) => {
		let logout = await axios.get(`http://localhost:4420/logout`, {withCredentials: true})
			sessionStorage.clear()
			localStorage.clear()
			window.location.href = '/';
	}
  render() {
    return (
      <nav className="logIn">
        <div className="container text-center p-3">
          <div className="row">
            {/*- COLUMA 1 NAV - LOGO -->*/}
            <div className="col" align="left">
              <a className="navbar-brand" href="/orders">
                <img src="logo.jpeg" alt="" height="100px" />
              </a>
            </div>
            {/*- END OF COL 1 - LOGO -->*/}

            {/*- COL 2 NAV - PROFILE AND LOG IN -->*/}
            <div className="col" align="right">
              <a className="btn btn-outline-secondary m-2" href="/profile">{localStorage.userFullName}</a>

              <Button variant="primary" type="submit" className="m-2" onClick={(e) => {
								// e.preventDefault();
								this.logOut()
							}
							}>LOG OUT</Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
