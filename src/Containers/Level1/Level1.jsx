import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../../components/optionSelectionButton/optionSelectionButton";
import Scenario from "../../Data/Scenario1.json";
import Graph from "../../Graph/Graph";
import NarativeBox from "../../components/narativeBox/narativeBox";
import { Gitgraph, Mode } from "@gitgraph/react";

class level1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNodeId: 0,
      tree: "tree0",
      treeObject: null
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
          const master = baseTree.branch("master");

          master.commit("Add tests");

          const development = baseTree.branch("development");

          development.commit("Init");

          const feature = baseTree.branch("feature_branch");

          feature.commit("Added some cool stuff");
          feature.commit("Added some other cool stuff");

          this.setState({ treeObject: baseTree });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree0", tree0);

    const tree01 = (
      <>
        <Gitgraph options={options}>
          {tree01 => {
            const master = tree01.branch("master");

            master.commit("Add tests");

            const development = tree01.branch("development");

            development.commit("Init");

            const feature = tree01.branch("feature_branch");

            feature.commit("Added some cool stuff");
            feature.commit("Added some other cool stuff");

            development.merge(feature, "Merged in feature");

            const customTagStyle = {
              bgColor: "red",
              strokeColor: "red",
              borderRadius: 0,
              pointerWidth: 0
            };
            development.tag({
              name: "CONFLICT",
              style: customTagStyle
            });
            this.setState({ treeObject: tree01 });
          }}
        </Gitgraph>
      </>
    );
    this.graphs.set("tree01", tree01);

    const tree014 = (
      <Gitgraph options={options}>
        {tree014 => {
          const master = tree014.branch("master");

          master.commit("Add tests");

          const development = tree014.branch("development");

          development.commit("Init");

          const feature = tree014.branch("feature_branch");

          feature.commit("Added some cool stuff");
          feature.commit("Added some other cool stuff");

          development.merge(feature, "Merged in feature");

          const customTagStyle = {
            bgColor: "green",
            strokeColor: "green",
            borderRadius: 0,
            pointerWidth: 0
          };
          development.tag({
            name: "Success!",
            style: customTagStyle
          });
          this.setState({ treeObject: tree014 });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree014", tree014);

    const tree02 = (
      <Gitgraph options={options}>
        {tree02 => {
          const master02 = tree02.branch("master");

          master02.commit("Add tests");

          const development02 = tree02.branch("development");

          development02.commit("Init");

          const feature02 = tree02.branch("feature_branch");

          feature02.commit("Added some cool stuff");
          feature02.commit("Added some other cool stuff");

          feature02.merge(development02, "Merged in feature");
          const customTagStyle = {
            bgColor: "red",
            strokeColor: "red",
            borderRadius: 0,
            pointerWidth: 0
          };
          feature02.tag({
            name: "CONFLICT",
            style: customTagStyle
          });
          this.setState({ treeObject: tree02 });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree02", tree02);

    const tree03 = (
      <Gitgraph options={options}>
        {tree03 => {
          const master03 = tree03.branch("master");

          master03.commit("Add tests");

          const development03 = tree03.branch("development");

          development03.commit("Init");

          const feature03 = tree03.branch("feature_branch");

          feature03.commit("Added some cool stuff");
          feature03.commit("Added some other cool stuff");

          development03.merge(feature03, "Merged in feature");

          const customTagStyle = {
            bgColor: "red",
            strokeColor: "red",
            borderRadius: 0,
            pointerWidth: 0
          };
          development03.tag({
            name: "CONFLICT",
            style: customTagStyle
          });
          this.setState({ treeObject: tree03 });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree03", tree03);

    const tree024 = (
      <Gitgraph options={options}>
        {tree024 => {
          const master = tree024.branch("master");

          master.commit("Add tests");

          const development = tree024.branch("development");

          development.commit("Init");

          const feature = tree024.branch("feature_branch");

          feature.commit("Added some cool stuff");
          feature.commit("Added some other cool stuff");

          development.merge(feature, "Merged in feature");

          const customTagStyle = {
            bgColor: "green",
            strokeColor: "green",
            borderRadius: 0,
            pointerWidth: 0
          };
          development.tag({
            name: "Success!",
            style: customTagStyle
          });
          this.setState({ treeObject: tree024 });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree024", tree024);

    const tree025 = (
      <Gitgraph options={options}>
        {tree025 => {
          const master = tree025.branch("master");

          master.commit("Add tests");

          const development = tree025.branch("development");

          development.commit("Init");

          const feature = tree025.branch("feature_branch");

          feature.commit("Added some cool stuff");
          feature.commit("Added some other cool stuff");

          master.merge(feature, "Merged in feature");

          this.setState({ treeObject: tree025 });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree025", tree025);

    const tree026 = (
      <Gitgraph options={options}>
        {tree026 => {
          const master1 = tree026.branch("master");

          master1.commit("Add tests");

          const development1 = tree026.branch("development");

          development1.commit("Init");

          const feature1 = tree026.branch("feature_branch");

          feature1.commit("Added some cool stuff");
          feature1.commit("Added some other cool stuff");

          development1.merge(feature1, "Merged in feature");

          const customTagStyle = {
            bgColor: "green",
            strokeColor: "green",
            borderRadius: 0,
            pointerWidth: 0
          };
          development1.tag({
            name: "Success!",
            style: customTagStyle
          });

          this.setState({ treeObject: tree026 });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree026", tree026);

    return this.graphs;
  };

  onHoverIn = ID => {};

  onHoverOut = ID => {};

  clearMethod = () => {
    console.log("hi");
    if (this.state.treeObject !== null) {
      this.state.treeObject.clear();
    }
  };

  render() {
    //const graph = new Graph(7);
    const vertices = JSON.parse(JSON.stringify(Scenario));
    // images = this.setGraphs();

    const buttons = [];
    for (
      let i = 0;
      i < vertices.nodes[this.state.currentNodeId].Edges.length;
      i++
    ) {
      buttons.push(
        <div key={i}>
          <OptionButton
            click={this.optionButtonClickHandler.bind(
              this,
              vertices.nodes[this.state.currentNodeId].Edges[i].ID
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
            {this.state.tree}
            {/* <button onClick={this.clearMethod}>force clear</button> */}
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

export default level1;
