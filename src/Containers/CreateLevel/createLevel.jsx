import * as React from "react";
import { Gitgraph, Mode } from "@gitgraph/react";
import { Row, Col, Button } from "react-bootstrap";
import "./level3-style.css";
import { MDBContainer, MDBScrollbar } from "mdbreact";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import canvas2image from "canvas2image";
import $ from "jquery";
// eslint-disable @typescript-eslint/explicit-function-return-type

class createLevel extends React.Component {
  constructor() {
    super();
    this.state = {
      branches: [],
      currentBranch: " ",
      error: " ",
      goalTree: null,
      hidden: false,
      commands: [],
      firstTime: true
    };
  }

  componentDidUpdate = () => {
    if (this.state.firstTime == true) {
      const ne = this.state.gitgraph.branch("master");
      console.log(ne);
      this.setState({
        currentBranch: "master"
      });
      var current = this.state.branches;
      current.push(ne);
      this.setState({ branches: current });
      console.log(this.state.branches);

      ne._graph.author = "user";
      ne.commit("init");
      this.setState({ firstTime: false });
    }
  };

  render() {
    const addCommit = message => {
      console.log(this.state);
      if (this.state.currentBranch !== " ") {
        const branch = this.state.branches.find(
          b => b.name === this.state.currentBranch
        );
        if (branch) {
          console.log(branch);
          branch._graph.author = "user";
          branch.commit(message);
          branch._graph.commits[branch._graph.commits.length - 1].merge = null;
        }
      } else if (message) {
        // NONE THIS NEEDED ANYMORE
        this.state.gitgraph._graph.author = "user";
        this.state.gitgraph.commit(message);
        this.state.gitgraph._graph.commits[
          this.state.gitgraph._graph.commits.length - 1
        ].merge = null;
      }
    };

    const addBranch = branchName => {
      if (this.state.branches.map(b => b.name).includes(branchName)) return;
      this.setState(state => ({
        branches: [...state.branches, this.state.gitgraph.branch(branchName)]
      }));
    };

    const mergeBranch = (currentBranch, destBranch) => {
      const branches = this.state.branches;
      const from = branches.find(from => from.name === currentBranch);
      const to = branches.find(to => to.name === destBranch);
      to.merge(from);
      const merge = [from.name, to.name];
      to._graph.commits[to._graph.commits.length - 1].merge = merge;
    };

    const checkBranch = name => {
      const check = this.state.branches.map(e => e.name);
      return check.includes(name);
    };

    const handleChange = name => e => {
      this.setState({ [name]: e.currentTarget.value });
    };

    const clear = () => {
      this.state.gitgraph.clear();
      this.setState({
        branches: [],
        currentBranch: "",
        error: " ",
        hidden: false,
        commands: []
      });
    };

    const handleHidden = () => {
      const newHidden = !this.state.hidden;
      this.setState({ hidden: newHidden });
    };

    // const handleProps = () => {
    //   this.props.setGraph({ data: this.state.gitgraph });

    //   const graph = document.querySelector("#graph2save");

    //   html2canvas(graph).then(function(canvas) {
    //     console.log(canvas);
    //     var image = canvas2image.convertToPNG(
    //       canvas,
    //       graph.offsetWidth,
    //       graph.offsetHeight
    //     );
    //     var image_data = $(image).attr(
    //       "/src/Containers/CreateLevel/CustomLevel"
    //     );
    //   });
    // };

    const handleProps = () => {
      const graph = document.querySelector("#graph2save");
      var ne = [];
      html2canvas(graph).then(function(canvas) {
        console.log(canvas);
        //saveAs(canvas.toDataURL(), "graph.png");

        ne.push(canvas.toDataURL());
      });
      ne.push(this.state.gitgraph);

      this.props.setGraph({ data: ne });
    };

    const handleCommand = () => {
      this.setState({
        commands: this.state.commands.concat(this.state["command"])
      });
      const coms = this.state["command"].split(" ");
      if (coms[0] !== "git") {
        alert(coms[0] + "is not recognised");
      }
      coms.slice(1).forEach((com, index, array) => {
        switch (com) {
          case "branch": {
            if (array[index + 1] && array[index + 1].match(/\<.*?\>/g)) {
              addBranch(
                array[index + 1].substring(1, array[index + 1].length - 1)
              );
            }
            this.setState({ error: " " });
            return;
          }
          case "commit": {
            if (array[index + 1] === "-m") {
              addCommit(array[index + 2]);
            }
            this.setState({ error: " " });
            return;
          }
          case "checkout": {
            if (
              array[index + 1] &&
              array[index + 1].match(/\<.*?\>/g) &&
              checkBranch(
                array[index + 1].substring(1, array[index + 1].length - 1)
              )
            ) {
              this.setState({
                ["currentBranch"]: array[index + 1].substring(
                  1,
                  array[index + 1].length - 1
                )
              });
            } else {
              var errorMsg = "branch " + array[index + 1] + " does not exist";
              this.setState({ error: errorMsg });
              console.log(errorMsg);
            }
            return;
          }
          case "merge": {
            if (
              array[index + 1] &&
              checkBranch(
                array[index + 1].substring(1, array[index + 1].length - 1)
              ) &&
              !array[index + 2]
            ) {
              // merges destination branch into current branch
              mergeBranch(
                array[index + 1].substring(1, array[index + 1].length - 1),
                this.state.currentBranch
              );
              this.setState({ error: " " });
            } else if (
              array[index + 1] &&
              array[index + 2] &&
              checkBranch(
                array[index + 1].substring(1, array[index + 1].length - 1)
              ) &&
              checkBranch(
                array[index + 2].substring(1, array[index + 2].length - 1)
              )
            ) {
              // sets first arg as current branch and merges 2nd arg into it
              mergeBranch(
                array[index + 2].substring(1, array[index + 2].length - 1),
                array[index + 1].substring(1, array[index + 1].length - 1)
              );
              this.setState({ error: " " });
            } else {
              if (array[index + 1] && !array[index + 2]) {
                var errorMsg = "branch " + array[index + 1] + " does not exist";
              } else if (array[index + 1] && array[index + 2]) {
                if (
                  checkBranch(
                    array[index + 1].substring(1, array[index + 1].length - 1)
                  )
                ) {
                  var errorMsg =
                    "branch " + array[index + 1] + " does not exist";
                } else if (
                  checkBranch(
                    array[index + 2].substring(1, array[index + 2].length - 1)
                  )
                ) {
                  var errorMsg =
                    "branch " + array[index + 1] + " does not exist";
                } else {
                  var errorMsg =
                    "branch " +
                    array[index + 1] +
                    " does not exist and branch " +
                    +array[index + 2] +
                    " does not exist";
                }
              }
              this.setState({ error: errorMsg });
              console.log(errorMsg);
            }
            return;
          }
        }
      });
    };

    const options = {
      mode: Mode.Compact
    };
    const scrollContainerStyle = {
      width: "100%",
      height: "100px",
      maxHeight: "100px",
      padding: "10px",
      outlineStyle: "auto",
      outlineColor: "grey"
    };
    return (
      <div id="content" className="level3-style container fluid">
        <Row id="main" lg={{ span: 12 }}>
          <Col align="center">
            <div className="pl-4 pr-4 card card-block d-table-cell">
              <p>Current Branch: {this.state.currentBranch}</p>
              <MDBContainer>
                <div
                  className="scrollbar my-5 mx-auto"
                  id="pastCommand"
                  style={scrollContainerStyle}
                >
                  {this.state.commands.map(e => (
                    <li>{e}</li>
                  ))}
                </div>
              </MDBContainer>
              <form
                id="commandLine"
                onSubmit={e => {
                  e.preventDefault();
                  handleCommand();
                }}
              >
                <center>
                  <p id="error">{this.state.error}</p>
                  <input
                    type="text"
                    value={this.state.command}
                    onChange={handleChange("command")}
                  />
                  <button
                    id="commandButton"
                    variant="dark"
                    size="sm"
                    disabled={this.state.hidden}
                  >
                    Enter Command
                  </button>
                </center>
              </form>
            </div>
            <Row id="clear_button">
              <Col>
                <Button variant="outline-danger" onClick={clear} block>
                  clear
                </Button>
              </Col>
              <Col>
                <Link to="/CreateLevel/CustomLevel">
                  <Button variant="outline-success" onClick={handleProps}>
                    save
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>

          <Col align="center">
            <div id="graph2save">
              <Gitgraph>{gitgraph => this.setState({ gitgraph })}</Gitgraph>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  console.log("dispatch method entered");
  return {
    setGraph: data => {
      dispatch({ payload: data, type: "SET_GRAPH" });
    }
  };
}

export default connect(null, mapDispatchToProps)(createLevel);
