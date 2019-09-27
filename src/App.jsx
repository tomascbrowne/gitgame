import React from "react";
import "./App.css";
import MenuButtons from "./components/menuButtons/menuButtons";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import logoImage from "./logo/Menu-logo.jpg";

const App = () => {
  return (
    <Container>
      <Row style={{ height: "100vh" }}>
        <Col className="md-6 lg-6">
          <MenuButtons />
        </Col>
        <Col className="md-6 lg-6">
          <Image src={logoImage} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
