import React, { Component } from "react";
import LoginFrom from "../../components/loginForm/loginForm";

class Login extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="col-md-4 cold-md-offset-4">
          <LoginFrom />
        </div>
      </div>
    );
  }
}

export default Login;
