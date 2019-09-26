import React from "react";
import "./App.css";
import MenuButtons from "./components/menuButtons";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import logoImage from "./logo/Menu-logo.jpg";

const App = () => {
  return (
    <Container style={{ height: "100%" }}>
      <Row>
        <Col>
          <MenuButtons />
        </Col>
        <Col>
          <Image src={logoImage} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
