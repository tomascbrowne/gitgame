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
    this.setState({ [e.target.id]: this.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    return (
      <div className={styles.loginContainer}>
        <label htmlFor="basic-url">Sign in</label>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextUsername">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col>
              <Form.Control
                type="username"
                placeholder="Username"
                className={styles.inputBox}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                className={styles.inputBox}
              />
            </Col>
          </Form.Group>
          <div className="input-field">
            <Button variant="secondary" type="submit">
              Login
            </Button>{" "}
          </div>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(signUp(creds))
  };
};

export default connect(null, mapDispatchToProps)(signUp);
