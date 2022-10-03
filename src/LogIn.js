import React from "react";
import "./App.css";

class Login extends React.Component {
  state = {};
  render() {
    return (
      <div className="container">
        {/*CARD (need to fix the size)*/}
        <div className="card">
          <div className="card-header">LogIn</div>
          <div className="card-body">
            {/*FORM*/}
            <form method="post" action="/orders">
              <label className="form-label">Email</label>
              <div className="input-group mb-3">
                <input type="text" className="form-control" name="email" />
              </div>
              <label className="form-label">Password</label>
              <div className="input-group mb-3">
                <input type="text" className="form-control" name="password" />
              </div>
              {/*BUTTON will take you to Orders if Authentification OK*/}
              <button className="btn btn-success">Log In</button>
            </form>
            <p className="small inline py-2">
              No access? Please click the link to let us know{" "}
              <a className="card-link" href="/loginerror">
                Click
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
