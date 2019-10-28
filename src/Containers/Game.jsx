import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import Level1 from "./Level1/Level1";
import Level2 from "./Level2/Level2";
import Level3 from "./Level3/Level3";

const game = () => {
  return (
    <div>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/Level1" exact render={() => <Level1 />} />
      <Route path="/Level2" exact render={() => <Level2 />} />
      <Route path="/Level3" exact render={() => <Level3 />} />
    </div>
  );
};

export default game;
