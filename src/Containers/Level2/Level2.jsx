import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import OptionButton from "../../components/optionSelectionButton/optionSelectionButton";
import Scenario from "../../Data/Scenario2.json";
import NarativeBox from "../../components/narativeBox/narativeBox";
import { Gitgraph, Mode } from "@gitgraph/react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setScore } from "../../Store/actions/scoreActions"

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
    //clearTree.clear();

    const current = ID;
    const vertices = JSON.parse(JSON.stringify(Scenario));
    const image = vertices.nodes[current].Image;
    this.setState({ tree: image, currentNodeId: current });
  };

  handleProps = () => {
    this.props.setScore();
  }

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
      <>
        <Gitgraph options={options}>
          {baseTree => {
            const development = baseTree.branch("development");

            development.commit("Add tests");
            development.commit("Add tests 2");

            const feature = development.branch("feature");

            feature.commit("Added some cool stuff");
            feature.commit("Added some other cool stuff");

            development.merge(feature, "");

            this.setState({ treeObject: tree01 });
          }}
        </Gitgraph>
      </>
    );
    this.graphs.set("tree01", tree01);

    const tree02 = (
      <>
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
      </>
    );
    this.graphs.set("tree02", tree02);

    const tree03 = (
      <>
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
      </>
    );
    this.graphs.set("tree03", tree03);

    const tree01p = (
      
        <Gitgraph options={options}>
          {baseTree => {
            const development = baseTree.branch("development");

            development.commit("Add tests");
            development.commit("Add tests 2");

            const feature = development.branch("feature");

            feature.commit("Added some cool stuff");
            feature.commit("Added some other cool stuff");

            development.merge(feature, "");

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

            this.setState({ treeObject: tree01p });
          }}
        </Gitgraph>
      
    );
    this.graphs.set("tree01p", tree01p);

    const tree02p = (
      
        <Gitgraph options={options}>
          {baseTree => {
            const development = baseTree.branch("development");

            development.commit("Add tests");
            development.commit("Add tests 2");

            development.commit("Added some cool stuff");
            development.commit("Added some other cool stuff");

            const customTagStyle = {
              bgColor: "red",
              strokeColor: "red",
              borderRadius: 0,
              pointerWidth: 0
            };
            development.tag({
              name: "Incorrect",
              style: customTagStyle
            });

            this.setState({ treeObject: tree02p });
          }}
        </Gitgraph>
      
    );
    this.graphs.set("tree02p", tree02p);

    const tree03p = (
     
        <Gitgraph options={options}>
          {baseTree => {
            const development = baseTree.branch("development");

            development.commit("Add tests");
            development.commit("Add tests 2");

            const feature = development.branch("feature");

            feature.commit("Added some cool stuff");
            feature.commit("Added some other cool stuff");
            feature.commit("Merge?");

            const customTagStyle = {
              bgColor: "red",
              strokeColor: "red",
              borderRadius: 0,
              pointerWidth: 0
            };
            feature.tag({
              name: "Incorrect",
              style: customTagStyle
            });

            this.setState({ treeObject: tree03p });
          }}
        </Gitgraph>
     
    );
    this.graphs.set("tree03p", tree03p);

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

    //Score button logic
    const success = ["tree01p"];
    var completeButton = null;
    if(success.includes(this.state.tree)) {
      if(this.props.auth.uid) {
        completeButton = <Link to="/">
       <Button disabled={false}
             onClick={this.handleProps}
             variant="outline-success"
              block
           >
            Complete Level !
        </Button>
       </Link>
      }
      else {
        completeButton = <Link to="/">
       <Button disabled={true}
             onClick={this.handleProps}
             variant="outline-danger"
              block
           >
            Must be logged in to save score 
        </Button>
       </Link>
      }
    }

    console.log(this.state.treeObject);
    console.log("DIV:" + this.state.tree);
    const colGraph = {
      alignItems: "center"
    }
    const rowStlye = {
      width: "100%"
    }
    return (
      <>
        <Row className="d-flex flex-row align-self-center p-2 h-100" style={rowStlye}>
          <Col className="d-flex flex-column align-self-center" style={colGraph}>
            {this.graphs.get(this.state.tree)}
            {this.state.tree}
          </Col>

          <Col>
            <NarativeBox
              text={vertices.nodes[this.state.currentNodeId].Description}
            />
            {buttons}
            <Button
                  variant="outline-danger"
                  href="/Level2"
                  block
                >
                  Restart
            </Button>
            {completeButton}
          </Col>
        </Row>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  console.log("entering method disp");
  return {
    setScore: score => dispatch(setScore())
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(level2);
