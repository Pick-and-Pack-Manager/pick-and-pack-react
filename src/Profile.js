import React from "react";
import "./App.css";

class Shipments extends React.Component {
  state = {};
  render() {
    return (
      <div class="card-body">
        <form method="post" action="/auth/login">
          <label class="form-label">Email</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" name="email" />
          </div>
          <label class="form-label">Password</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" name="password" />
          </div>
          <button class="btn btn-success">Log In</button>
        </form>
        <p class="small inline py-2">
          New to Airbnb?{" "}
          <a class="card-link" href="/auth/signup">
            Signup
          </a>
        </p>
      </div>
    );
  }
}

export default Shipments;
