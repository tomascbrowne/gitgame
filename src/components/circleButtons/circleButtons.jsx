import React, { Component } from "react";
import "./circleButtons.css";
import Button from "react-bootstrap/Button";

const CircleButtons = props => {
  const level = "./level" + props.value;
  return (
    <Button className="btn-lg" variant="primary" href={level}>
      {props.value}
    </Button>
  );
};

export default CircleButtons;
