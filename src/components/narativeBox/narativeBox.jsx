import React, { Component } from "react";

const narativeBox = props => {
  return (
    <div class="card text-center">
      <div className="card-body">
        <h5 className="card-title">mission text UwU</h5>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
};

export default narativeBox;
