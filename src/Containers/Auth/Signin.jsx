import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./signin.module.css";
import { connect } from "react-redux";
import { signIn } from "../../Store/actions/authActions";

class SignIn extends Component {
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
    this.props.signIn(this.state);
  };
  render() {
    const authError = this.props.authError;
    return (
      //   <div className={styles.loginContainer}>
      //     <label htmlFor="basic-url">Sign in</label>
      //     <Form onSubmit={this.handleSubmit}>
      //       <Form.Group as={Row} controlId="formPlaintextUsername">
      //         <Form.Label column sm="2">
      //           Username
      //         </Form.Label>
      //         <Col>
      //           <Form.Control
      //             type="username"
      //             placeholder="Username"
      //             className={styles.inputBox}
      //             onChange={this.handleChange.bind(this)}
      //           />
      //         </Col>
      //       </Form.Group>
      //       <Form.Group as={Row} controlId="formPlaintextPassword">
      //         <Form.Label column sm="2">
      //           Password
      //         </Form.Label>
      //         <Col>
      //           <Form.Control
      //             type="password"
      //             placeholder="Password"
      //             className={styles.inputBox}
      //             onChange={this.handleChange.bind(this)}
      //           />
      //         </Col>
      //       </Form.Group>
      //       <div className="input-field">
      //         <Button variant="secondary" type="submit">
      //           Login
      //         </Button>{" "}
      //       </div>
      //     </Form>
      //   </div>
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
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
