import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "./signin.module.css";
import { connect } from "react-redux";
import { signIn } from "../../Store/actions/authActions";
import { Link } from "react-router-dom";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    redirect: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  handleLoginRoute = () => {
    if (this.props.authError == null) {
      this.setState({ redirect: true });
    }
  };

  render() {
    const containerStyle = {
      maxWidth: "400px",
      paddingTop: "20px"
    };
    const authError = this.props.authError;

    if (this.state.redirect == true) {
      return <Link to="" />;
    }

    return (
      <div className="container" style={containerStyle} align="left">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
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
            Login
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
