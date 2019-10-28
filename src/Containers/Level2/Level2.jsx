import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../../components/optionSelectionButton/optionSelectionButton";
import Scenario from "../../Data/Scenario2.json";
import Graph from "../../Graph/Graph";
import NarativeBox from "../../components/narativeBox/narativeBox";

class level2 extends Component {
  state = {
    currentNode: 0,
    tree: "tree0.png",
    previous: ""
  };

  optionButtonClickHandler = (ID, vertices) => {
    console.log("Button clicked");
    const current = ID;
    this.setState({ currentNode: current });
    let image = vertices.nodes[current].Image;
    this.setState({ tree: image });
  };

  // https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack function influenced by this person
  importAll = r => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  onHoverIn = Image => {
    let img = Image;
    let prev = this.state.tree;
    this.setState({ tree: Image });
    this.setState({ previous: prev });
  };

  onHoverOut = Image => {
    let img = this.state.previous;
    this.setState({ tree: img });
  };

  render() {
    console.log(JSON.parse(JSON.stringify(Scenario)));
    //const graph = new Graph(7);
    const vertices = JSON.parse(JSON.stringify(Scenario));
    const images = this.importAll(
      require.context("./images", false, /\.(png|jpe?g|svg)$/)
    );

    const buttons = [];
    for (
      let i = 0;
      i < vertices.nodes[this.state.currentNode].Edges.length;
      i++
    ) {
      buttons.push(
        <div>
          <OptionButton
            inHover={this.onHoverIn.bind(
              this,
              vertices.nodes[this.state.currentNode].Edges[i].Image
            )}
            outHover={this.onHoverOut.bind(
              this,
              vertices.nodes[this.state.currentNode].Edges[i].Image
            )}
            click={this.optionButtonClickHandler.bind(
              this,
              vertices.nodes[this.state.currentNode].Edges[i].ID,
              vertices
            )}
            text={vertices.nodes[this.state.currentNode].Edges[i].OptionText}
          />
        </div>
      );
    }

    console.log(this.state.tree);
    let current = images[this.state.tree];
    console.log(current);

    return (
      <>
        <Row className="d-flex flex-row align-self-center p-2 h-100">
          <Col className="d-flex flex-column align-self-center">
            {/* <img src={images[image]} /> */}
            <img src={current} />
          </Col>

          <Col>
            <NarativeBox
              text={vertices.nodes[this.state.currentNode].Description}
            />
            {buttons}
          </Col>
        </Row>
      </>
    );
  }
}

export default level2;
