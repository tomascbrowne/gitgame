import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Home from "./Home/Home";
import Level1 from "./Level1/Level1";
import Level2 from "./Level2/Level2";
import Level3 from "./Home/Home";

const game = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Git Game</Navbar.Brand>
      </Navbar>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/Level1" exact render={() => <Level1 />} />
      <Route path="/Level2" exact render={() => <Level2 />} />
      <Route path="/Level3" exact render={() => <Level3 />} />
    </div>
  );
};

export default game;
