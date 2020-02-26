import React from "react";
import { Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from "./Home/Home";
import Level1 from "./Level1/Level1";
import Level2 from "./Level2/Level2";
import Level3 from "./Level3/Level3";
import SignIn from "./Auth/Signin";
import SignUp from "./Auth/Signup";
import { connect } from "react-redux";
import { signOut } from "../Store/actions/authActions";

const game = props => {
  const { auth } = props;
  const links = auth.uid ? (
    <Nav.Link href="/" onClick={props.signOut}>
      Log Out
    </Nav.Link>
  ) : (
    <>
      <Nav.Link href="/Signin">Sign In</Nav.Link>
      <Nav.Link href="/Signup">Sign Up</Nav.Link>
    </>
  );
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Git Game</Navbar.Brand>

        <Navbar.Collapse>
          <Nav className="mr-auto navbar-right">
            <Nav className="mr-auto navbar-right">{links}</Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/Level1" exact render={() => <Level1 />} />
      <Route path="/Level2" exact render={() => <Level2 />} />
      <Route path="/Level3" exact render={() => <Level3 />} />
      <Route path="/Signin" exact render={() => <SignIn />} />
      <Route path="/Signup" exact render={() => <SignUp />} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(game);
