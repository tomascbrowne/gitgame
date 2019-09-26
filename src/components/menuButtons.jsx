import React, { Component } from "react";
import CircleButtons from "./circleButtons/circleButtons";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class MenuButtons extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col>
          <Row xl={2}></Row>
          <Row xl={2}></Row>
          <Row xl={2}>
            <CircleButtons />
          </Row>
          <Row xl={2}></Row>
          <Row xl={2}>
            <CircleButtons />
          </Row>
          <Row xl={2}></Row>
        </Col>
        <Col>
          <Row xl={2}>
            <CircleButtons />
          </Row>
          <Row xl={2}>
            <CircleButtons />
          </Row>
          <Row xl={2}></Row>
          <Row xl={2}>
            <CircleButtons />
          </Row>
          <Row xl={2}></Row>
          <Row xl={2}>
            <CircleButtons />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default MenuButtons;
