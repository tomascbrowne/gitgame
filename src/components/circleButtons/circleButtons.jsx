import React, { Component } from "react";
import "./circleButtons.css";
import Button from "react-bootstrap/Button";

class CircleButtons extends Component {
  state = { value: this.props.value };
  render() {
    return (
      <Button className="btn-lg" variant="primary">
        {this.state.value}
      </Button>
    );
  }
}

export default CircleButtons;
