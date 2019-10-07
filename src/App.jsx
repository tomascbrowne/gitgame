import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Game from "./Containers/Game";

const App = () => {
  return (
    <BrowserRouter>
      <Game />
    </BrowserRouter>
  );
};

export default App;
