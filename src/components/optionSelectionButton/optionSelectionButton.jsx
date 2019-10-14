import React, { Component } from "react";

const optionSelectionButton = props => {
  const buttonText = props.text;
  const style = {
    padding: "10px",
    border: "2px black"
  };
  return (
    <div className="d-inline p-2">
      <button onClick={props.click} style={style}>
        {buttonText}
      </button>
    </div>
  );
};

export default optionSelectionButton;
