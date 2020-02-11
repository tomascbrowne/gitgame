import React, { Component } from "react";
import PropTypes from "prop-types";

class signupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirmation: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefualt();
    console.log(this.state);
    this.props.userSignupRequest(this.state);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div>
          <label className="control-label">Username</label>
          <input
            onChange={this.onChange.bind(this)}
            value={this.state.username}
            type="text"
            name="username"
            className="form-control"
          />
        </div>

        <div>
          <label className="control-label">Password</label>
          <input
            onChange={this.onChange.bind(this)}
            value={this.state.password}
            type="password"
            name="password"
            className="form-control"
          />
        </div>

        <div>
          <label className="control-label">Password Confirmation</label>
          <input
            onChange={this.onChange.bind(this)}
            value={this.state.passwordConfirmation}
            type="password"
            name="passwordConfirmation"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-lrg">Sign up</button>
        </div>
      </form>
    );
  }
}

signupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default signupForm;
