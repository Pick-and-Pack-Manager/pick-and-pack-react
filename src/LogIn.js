import React from "react";
import "./App.css";

class Login extends React.Component {
  state = {};
  render() {
    return (
      <div className="card-body">
        <form method="post" action="/auth/login">
          <label className="form-label">Email</label>
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="email" />
          </div>
          <label className="form-label">Password</label>
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="password" />
          </div>
          <button className="btn btn-success">Log In</button>
        </form>
        <p className="small inline py-2">
          New to Airbnb?{" "}
          <a className="card-link" href="/auth/signup">
            Signup
          </a>
        </p>
      </div>
    );
  }
}

export default Login;
