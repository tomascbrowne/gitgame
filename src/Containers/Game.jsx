import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import Level1 from "./Level1/Level1";

const game = () => {
  return (
    <div>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/Level1" exact render={() => <Level1 />} />
    </div>
  );
};

export default game;
