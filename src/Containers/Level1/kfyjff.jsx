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
      tree: "tree0"
    };
    this.setGraphs();
  }

  optionButtonClickHandler = ID => {
    console.log("Button clicked");
    const clear = this.state.tree + "c";
    this.graphs.get(clear);
    console.log(clear);

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

    const tree0 = () => {
      const master = tree0.branch("master");

      master.commit("Add tests");

      const development = tree0.branch("development");

      development.commit("Init");

      const feature = tree0.branch("feature_branch");

      feature.commit("Added some cool stuff");
      feature.commit("Added some other cool stuff");
    };

    this.graphs.set("tree0", tree0);

    // const tree0 = () => {
    //   tree0.clear();
    // };
    // this.graphs.set("tree0c", tree0c);

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
          }}
        </Gitgraph>
      </>
    );
    this.graphs.set("tree01", tree01);

    const tree02 = (
      <Gitgraph options={options}>
        {tree02 => {
          const master = tree02.branch("master");

          master.commit("Add tests");

          const development = tree02.branch("development");

          development.commit("Init");

          const feature = tree02.branch("feature_branch");

          feature.commit("Added some cool stuff");
          feature.commit("Added some other cool stuff");

          feature.merge(development, "Merged in feature");

          const customTagStyle = {
            bgColor: "red",
            strokeColor: "red",
            borderRadius: 0,
            pointerWidth: 0
          };
          feature.tag({
            name: "CONFLICT",
            style: customTagStyle
          });
        }}
      </Gitgraph>
    );
    this.graphs.set("tree02", tree02);

    const tree03 = (
      <Gitgraph options={options}>
        {tree03 => {
          const master = tree03.branch("master");

          master.commit("Add tests");

          const development = tree03.branch("development");

          development.commit("Init");

          const feature = tree03.branch("feature_branch");

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
        }}
      </Gitgraph>
    );
    this.graphs.set("tree03", tree03);

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
        }}
      </Gitgraph>
    );
    this.graphs.set("tree014", tree014);

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
        }}
      </Gitgraph>
    );
    this.graphs.set("tree025", tree025);

    const tree026 = (
      <Gitgraph options={options}>
        {tree026 => {
          const master = tree026.branch("master");

          master.commit("Add tests");

          const development = tree026.branch("development");

          development.commit("Init");

          const feature = tree026.branch("feature_branch");

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
        }}
      </Gitgraph>
    );
    this.graphs.set("tree026", tree026);

    return this.graphs;
  };

  onHoverIn = ID => {};

  onHoverOut = ID => {};

  render() {
    console.log(JSON.parse(JSON.stringify(Scenario)));
    //const graph = new Graph(7);
    const vertices = JSON.parse(JSON.stringify(Scenario));
    // let images = new Map();
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

    console.log("Json image: ");
    console.log(vertices.nodes[this.state.currentNodeId].Image);
    //let currentGraphString = vertices.nodes[this.state.currentNodeId].Image;
    // images.get(currentGraphString)
    console.log(this.graphs.get(this.state.tree));

    const options = {
      mode: Mode.Compact
    };

    return (
      <>
        <Row className="d-flex flex-row align-self-center p-2 h-100">
          <Col className="d-flex flex-column align-self-center">
            <Gitgraph options={options}>
              {this.graphs.get(this.state.tree)}
            </Gitgraph>
            {this.state.tree}
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
