import React, { Component } from "react";
import CircleButtons from "../circleButtons/circleButtons";
import "./menuButtons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class MenuButtons extends Component {
  state = {};
  render() {
    return (
      <Row className="h-100">
        <Col>
          <Row className="p-3b"></Row>
          <Row className="p-3b"></Row>
          <Row className="p-3b"></Row>
          <Row className="p-3b">
            <CircleButtons value={4} />
          </Row>
          <Row className="p-3b"></Row>
          <Row className="p-3b">
            <CircleButtons value={2} />
          </Row>
        </Col>
        <Col>
          <Row className="p-3b p-3t">
            <CircleButtons value={6} />
          </Row>
          <Row className="p-3b">
            <CircleButtons value={5} />
          </Row>
          <Row className="p-3b"></Row>
          <Row className="p-3b">
            <CircleButtons value={3} />
          </Row>
          <Row className="p-3b"></Row>
          <Row className="p-3b">
            <CircleButtons value={1} />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default MenuButtons;
