import React, { Component } from "react";
import { Gitgraph } from "@gitgraph/react";
import { Redirect } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import logoImage from "./Menu-logo.jpg";
import Container from "react-bootstrap/Container";

class level3 extends Component {
  state = {
    redirect: false,
    redirectPage: ""
  };

  onCommitClick = page => {
    const currentPage = page;
    console.log(currentPage);
    this.setState({ redirect: "true", redirectPage: currentPage });
    return;
  };

  importAll = () => {
    const options = {};

    var renderMessage = function(commit) {
      return React.createElement(
        "text",
        {
          y: commit.style.dot.size,
          alignmentBaseline: "central",
          fill: commit.style.dot.color
        },
        commit.hashAbbrev,
        " - ",
        commit.subject
      );
    };

    const graphs = new Map();
    const tree0 = (
      <Gitgraph options={options}>
        {tree0 => {
          const master = tree0.branch("master");

          master.commit({
            subject: "Level 1",
            renderMessage: renderMessage,
            onClick: this.onCommitClick.bind(this, "level1")
          });

          const development = tree0.branch("development");

          development.commit({
            subject: "Level 2",
            renderMessage: renderMessage,
            onClick: this.onCommitClick.bind(this, "level2")
          });

          development.commit({
            subject: "Level 3",
            renderMessage: renderMessage,
            onClick: this.onCommitClick.bind(this, "level3")
          });

          development.commit({
            subject: "Level 4",
            renderMessage: renderMessage,
            onClick: this.onCommitClick.bind(this, "level4")
          });

          //master.merge(development, "");
          master.merge({
            branch: development,
            subject: "HEHE EXX DEE",
            renderMessage: renderMessage
          });

          master.commit({
            subject: "Level 5",
            renderMessage: renderMessage,
            onClick: this.onCommitClick.bind(this, "level5")
          });

          master.commit({
            subject: "Level 6",
            renderMessage: renderMessage,
            onClick: this.onCommitClick.bind(this, "level6")
          });
        }}
      </Gitgraph>
    );
    graphs.set("tree0", tree0);

    return graphs;
  };

  render() {
    let graphs = new Map();
    graphs = this.importAll();

    if (this.state.redirect) {
      console.log("Entering redirect method");
      let page = "/" + this.state.redirectPage;
      return <Redirect to={page} />;
    }

    return (
      <>
        <Container>
          <Row style={{ height: "100vh" }}>
            <Col className="md-6 lg-6">{graphs.get("tree0")}</Col>
            <Col className="md-6 lg-6">
              <Image src={logoImage} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default level3;
