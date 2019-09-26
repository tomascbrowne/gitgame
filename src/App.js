import React from "react";
import "./App.css";
import MenuButtons from "./components/menuButtons";

function App() {
  return (
    <React.Fragment>
      <head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"
        ></link>
      </head>
      <div className="row">
        <div className="col-md-5">
          <div className="leftside">
            <main className="container">
              <MenuButtons />
            </main>
          </div>
        </div>
        <div className="col-md-6">
          <div className="rightside">
            <img
              src={require("./logo/Menu-logo.jpg")}
              alt={"Home page logo"}
              className="img-responsive"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
