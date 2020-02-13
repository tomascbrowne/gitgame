import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../../components/optionSelectionButton/optionSelectionButton";
import Scenario from "../../Data/Scenario2.json";
import NarativeBox from "../../components/narativeBox/narativeBox";
import { Gitgraph, Mode } from "@gitgraph/react";

class level2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNodeId: 0,
      tree: "tree0",
      treeObject: null,
      previous: ""
    };
    this.setGraphs();
  }

  optionButtonClickHandler = ID => {
    console.log("Button clicked");
    const clearTree = this.state.treeObject;
    clearTree.clear();

    const current = ID;
    let image = this.state.tree;
    image += ID;
    this.setState({ tree: image, currentNodeId: current });
  };

  graphs = new Map();

  setGraphs = () => {
    const options = {
      mode: Mode.Compact
    };

    const tree0 = (
      <Gitgraph options={options}>
        {baseTree => {
          const development = baseTree.branch("development");

          development.commit("Add tests");
          development.commit("Add tests 2");

          const feature = development.branch("feature");

          feature.commit("Added some cool stuff");
          feature.commit("Added some other cool stuff");

          this.setState({ treeObject: baseTree });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree0", tree0);

    const tree01 = (
      <Gitgraph options={options}>
        {baseTree => {
          const development = baseTree.branch("development");

          development.commit("Add tests");
          development.commit("Add tests 2");

          const feature = development.branch("feature");

          feature.commit("Added some cool stuff");
          feature.commit("Added some other cool stuff");

          feature.merge(development, "");

          this.setState({ treeObject: tree01 });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree01", tree01);

    const tree02 = (
      <Gitgraph options={options}>
        {baseTree => {
          const development = baseTree.branch("development");

          development.commit("Add tests");
          development.commit("Add tests 2");

          development.commit("Added some cool stuff");
          development.commit("Added some other cool stuff");

          this.setState({ treeObject: tree02 });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree02", tree02);

    const tree03 = (
      <Gitgraph options={options}>
        {baseTree => {
          const development = baseTree.branch("development");

          development.commit("Add tests");
          development.commit("Add tests 2");

          const feature = development.branch("feature");

          feature.commit("Added some cool stuff");
          feature.commit("Added some other cool stuff");
          feature.commit("Merge?");

          this.setState({ treeObject: tree03 });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree03", tree03);

    const correct = (
      <Gitgraph options={options}>
        {baseTree => {
          const development = baseTree.branch("correct");

          const customTagStyle = {
            bgColor: "green",
            strokeColor: "green",
            borderRadius: 0,
            pointerWidth: 0
          };
          development.tag({
            name: "Correct!",
            style: customTagStyle
          });

          this.setState({ treeObject: correct });
        }}
      </Gitgraph>
    );
    this.graphs.set("correct", correct);

    const incorrect = (
      <Gitgraph options={options}>
        {baseTree => {
          const development = baseTree.branch("incorrect");

          const customTagStyle = {
            bgColor: "red",
            strokeColor: "red",
            borderRadius: 0,
            pointerWidth: 0
          };
          development.tag({
            name: "incorrect!",
            style: customTagStyle
          });

          this.setState({ treeObject: incorrect });
        }}
      </Gitgraph>
    );
    this.graphs.set("incorrect", incorrect);

    return this.graphs;
  };

  onHoverIn = Image => {
    let prev = this.state.tree;
    this.setState({ tree: Image });
    this.setState({ previous: prev });
  };

  onHoverOut = Image => {
    let img = this.state.previous;
    this.setState({ tree: img });
  };

  render() {
    const vertices = JSON.parse(JSON.stringify(Scenario));

    console.log(vertices.nodes[this.state.currentNodeId].Edges.length);

    const buttons = [];
    for (
      let i = 0;
      i < vertices.nodes[this.state.currentNodeId].Edges.length;
      i++
    ) {
      buttons.push(
        <div>
          <OptionButton
            inHover={this.onHoverIn.bind(
              this,
              vertices.nodes[this.state.currentNodeId].Edges[i].Image
            )}
            outHover={this.onHoverOut.bind(
              this,
              vertices.nodes[this.state.currentNodeId].Edges[i].Image
            )}
            click={this.optionButtonClickHandler.bind(
              this,
              vertices.nodes[this.state.currentNodeId].Edges[i].ID,
              vertices
            )}
            text={vertices.nodes[this.state.currentNodeId].Edges[i].OptionText}
          />
        </div>
      );
    }

    console.log(this.state.treeObject);
    console.log("DIV:" + this.state.tree);
    return (
      <>
        <Row className="d-flex flex-row align-self-center p-2 h-100">
          <Col className="d-flex flex-column align-self-center">
            {this.graphs.get(this.state.tree)}
          </Col>

          <Col>
            <NarativeBox
              text={vertices.nodes[this.state.currentNodeId].Description}
            />
            {buttons}
          </Col>
        </Row>
      </>
    );
  }
}

export default level2;
