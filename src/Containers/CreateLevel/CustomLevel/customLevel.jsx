import * as React from "react";
import { Gitgraph, Mode } from "@gitgraph/react";
import { Row, Col, Button } from "react-bootstrap";
import "./level3-style.css";
import { MDBContainer, MDBScrollbar } from "mdbreact";
import { connect } from "react-redux";
import { getGraph } from "../../../Store/actions/createLevelAction";
//import { useSelector } from "react-redux";
// eslint-disable @typescript-eslint/explicit-function-return-type

class customLevel extends React.Component {
  constructor() {
    super();
    this.state = {
      branches: [],
      currentBranch: " ",
      error: " ",
      goalTree: null,
      hidden: false,
      commands: []
    };
  }

  render() {
    console.log("AA");
    console.log();
    console.log("AA");
    const addCommit = message => {
      if (this.state.currentBranch !== " ") {
        const branch = this.state.branches.find(
          b => b.name === this.state.currentBranch
        );
        if (branch) {
          console.log(branch);
          branch._graph.author = "user";
          branch.commit(message);
        }
      } else if (message) {
        this.state.gitgraph._graph.author = "user";
        this.state.gitgraph.commit(message);
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

    const handleCheck = () => {
      const branch = this.state.gitgraph;
      console.log(branch._graph.commits);
      if (
        this.state.goalTree._graph.commits.length ==
        branch._graph.commits.length
      ) {
        for (const [
          index,
          value
        ] of this.state.goalTree._graph.commits.entries()) {
          if (value.refs[0] != branch._graph.commits[index].refs[0]) {
            return alert("They don't match");
          }
        }
        return alert("They don't match!");
      } else {
        return alert("They don't match");
      }
    };

    const handleHidden = () => {
      const newHidden = !this.state.hidden;
      this.setState({ hidden: newHidden });
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

    //const graph = useSelector(state => state.graph);

    const branches = this.state.branches;
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
                  <Button
                    id="commandButton"
                    variant="dark"
                    size="sm"
                    disabled={this.state.hidden}
                  >
                    Enter Command
                  </Button>
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
                <Button variant="outline-success" onClick={handleCheck} block>
                  check answer
                </Button>
              </Col>
            </Row>

            <div>{this.state.currentBranch}</div>
          </Col>

          <Col align="center">
            <Gitgraph>{gitgraph => this.setState({ gitgraph })}</Gitgraph>

            {/* <button onClick={handleHidden}>show me the money</button> */}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  graph: state.graph.setgraph
});

export default connect(mapStateToProps, { getGraph })(customLevel);
