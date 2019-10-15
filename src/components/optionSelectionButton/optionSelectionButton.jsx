import React, { Component } from "react";

const optionSelectionButton = props => {
  const buttonText = props.text;
  return (
    <div className="d-inline p-2">
      <button
        onClick={props.click}
        className="btn btn-secondary btn-lg btn-block"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default optionSelectionButton;
