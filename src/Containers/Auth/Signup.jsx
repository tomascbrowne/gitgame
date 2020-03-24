import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./signin.module.css";
import { connect } from "react-redux";
import { signUp } from "../../Store/actions/authActions";

class SignUp extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const containerStyle = {
      maxWidth: "400px",
      paddingTop: "20px"
    };
    const authError = this.props.authError;
    return (
      <div className="container" style={containerStyle} align="left">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="form-group" id="userEntry">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              type="username"
              id="username"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              id="password"
              onChange={this.handleChange}
            />
          </div>
          <Button type="submit" className="btn pink lighten-1 z-depth-0">
            Sign Up
          </Button>

          <div className="center red-text">
            {authError ? <p>{authError}</p> : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(signUp(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
