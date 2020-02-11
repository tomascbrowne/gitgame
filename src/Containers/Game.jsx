import React from "react";
import { Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Home from "./Home/Home";
import Level1 from "./Level1/Level1";
import Level2 from "./Level2/Level2";
import Level3 from "./Level3/Level3";
import Login from "./Login/Login";
import SignUp from "./SignupPage/SignupPage";
import { Nav } from "react-bootstrap";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

const store = createStore((state = {}) => state, applyMiddleware(thunk));

const game = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Git Game</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/SignUp">Sign up</Nav.Link>
        </Nav>
      </Navbar>
      <Provider store={store}>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/Level1" exact render={() => <Level1 />} />
        <Route path="/Level2" exact render={() => <Level2 />} />
        <Route path="/Level3" exact render={() => <Level3 />} />
        <Route path="/Login" exact render={() => <Login />} />
        <Route path="/SignUp" exact render={() => <SignUp />} />
      </Provider>
    </div>
  );
};

export default game;
