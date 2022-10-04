import React from "react";
import "./App.css";

class Nav extends React.Component {
  state = {};
  render() {
    return (
      <nav className="logIn">
        <div className="container text-center py-3">
          <div className="row">
            {/*- COLUMA 1 NAV - LOGO -->*/}
            <div className="col" align="left">
              <a className="navbar-brand" href="/houses">
                <img src="logo.jpeg" alt="" height="100px" />
              </a>
            </div>
            {/*- END OF COL 1 - LOGO -->*/}

            {/*- COL 2 NAV - PROFILE AND LOG IN -->*/}
            <div className="col" align="right">
              <a className="btn btn-outline-secondary">PROFILE</a>

              <a className="btn btn-outline-secondary">LOG OUT</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
