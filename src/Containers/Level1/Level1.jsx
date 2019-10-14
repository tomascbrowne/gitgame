import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../../components/optionSelectionButton/optionSelectionButton";
import Scenario from "../../Data/Scenario1.json";
import Graph from "../../Graph/Graph";
import Image from "react-bootstrap/Image";

class level1 extends Component {
  state = {
    currentNode: 0,
    tree: "tree0"
  };

  optionButtonClickHandler = ID => {
    console.log("Button clicked");
    const current = ID;
    this.setState({ currentNode: current });
    let image = this.state.tree;
    image += ID;
    this.setState({ tree: image });
  };

  importAll = r => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid grey",
      padding: "8px",
      alignText: "center"
    };
    console.log(JSON.parse(JSON.stringify(Scenario)));
    const graph = new Graph(7);
    const vertices = JSON.parse(JSON.stringify(Scenario));
    const images = this.importAll(
      require.context("./images", false, /\.(png|jpe?g|svg)$/)
    );
    // for (const i = 0; i < vertices.length; i++) {
    //   graph.addVertex(vertices.nodes[i]);
    // }
    // for (const i = 0; i < vertices.nodes.length; i++) {
    //   for (const j = 0; j < vertices.nodes[i].Edges.length; j++) {
    //     graph.addEdge(vertices.nodes[i].ID, vertices.nodes[i].Edges[j].ID);
    //   }
    // }

    const items = [];
    for (
      let i = 0;
      i < vertices.nodes[this.state.currentNode].Edges.length;
      i++
    ) {
      items.push(
        <OptionButton
          click={this.optionButtonClickHandler.bind(
            this,
            vertices.nodes[this.state.currentNode].Edges[i].ID
          )}
          text={vertices.nodes[this.state.currentNode].Edges[i].OptionText}
        />
      );
    }

    // let image = "./tree";
    // image += vertices.nodes[this.state.currentNode].ID;
    // image += ".png";
    // console.log(image);

    // let image = this.state.tree;
    // image += vertices.nodes[this.state.currentNode].ID;
    // image += ".png";
    // this.setState({ tree: image });

    let image = this.state.tree;
    image += ".png";

    return (
      <>
        <Row className="d-flex flex-row align-self-center p-2 h-100">
          <Col className="d-flex flex-column align-self-center">
            <div style={style}>
              <h1>{image}</h1>
              <h2>{images.length}</h2>
            </div>
            <img src={images[image]} />
          </Col>

          <Col className="d-flex flex-column align-self-center">
            <div style={style}>
              <h1>{vertices.nodes[this.state.currentNode].Description}</h1>
              {/* <NarativeBox style={style} /> */}
            </div>
            <div className="align-self-center p-3">{items}</div>
          </Col>
        </Row>
      </>
    );
  }
}

export default level1;
