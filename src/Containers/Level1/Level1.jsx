import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import NarativeBox from "../../components/narativeBox/narativeBox";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../../components/optionSelectionButton/optionSelectionButton";

class level1 extends Component {
  state = {};
  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid grey",
      padding: "8px",
      alignText: "center"
    };

    return (
      <>
        <Row className="d-flex flex-row align-self-center p-2 h-100">
          <Col className="d-flex flex-column align-self-center">
            <div style={style}>
              <h1>git tree place holder</h1>
            </div>
          </Col>

          <Col className="d-flex flex-column align-self-center">
            <div style={style}>
              <h1>Narative box placeholder</h1>
              {/* <NarativeBox style={style} /> */}
            </div>
            <div className="align-self-center p-3">
              <OptionButton text="Option 1" />
              <OptionButton text="Option 2" />
              <OptionButton text="Option 3" />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default level1;
