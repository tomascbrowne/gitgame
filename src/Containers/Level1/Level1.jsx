import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class level1 extends Component {
  state = {};
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col className="md-6 lg-6"></Col>
            <Col className="md-6 lg-6"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default level1;
