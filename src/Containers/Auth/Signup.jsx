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
    const authError = this.props.authError;
    return (
      // This form looks PENG but don't work so we back on ugly
      //
      // <div className={styles.loginContainer}>
      //   <label htmlFor="basic-url">Sign up</label>
      //   <Form onSubmit={this.handleSubmit}>
      //     <Form.Group as={Row} controlId="formPlaintextUsername">
      //       <Form.Label column sm="2">
      //         Username
      //       </Form.Label>
      //       <Col>
      //         <Form.Control
      //           type="username"
      //           placeholder="Username"
      //           className={styles.inputBox}
      //         />
      //       </Col>
      //     </Form.Group>
      //     <Form.Group as={Row} controlId="formPlaintextPassword">
      //       <Form.Label column sm="2">
      //         Password
      //       </Form.Label>
      //       <Col>
      //         <Form.Control
      //           type="password"
      //           placeholder="Password"
      //           className={styles.inputBox}
      //         />
      //       </Col>
      //     </Form.Group>
      //     <div className="input-field">
      //       <Button variant="secondary" type="submit">
      //         Sign Up
      //       </Button>{" "}
      //     </div>
      //   </Form>
      // </div>
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input type="username" id="username" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
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
