import * as React from "react";
import { Gitgraph, Mode } from "@gitgraph/react";
import { Row, Col, Button } from "react-bootstrap";
import "./level3-style.css";
import { MDBContainer, MDBScrollbar } from "mdbreact";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setScore } from "../../Store/actions/scoreActions"
// eslint-disable @typescript-eslint/explicit-function-return-type

class level3 extends React.Component {
  constructor() {
    super();
    this.state = {
      branches: [],
      currentBranch: " ",
      error: " ",
      goalTree: null,
      hidden: false,
      commands: [],
      firstTime: true,
      complete: false
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

      ne._graph.author = "";
      ne.commit("init");
      this.setState({ firstTime: false });

      //hard coded setup
      const merge = ["development", "master"];
      this.state.goalTree._graph.commits[
        this.state.goalTree._graph.commits.length - 1
      ].merge = merge;
      console.log(this.state.goalTree);
    }
  };

  handleProps = () => {
    this.props.setScore();
  }

  render() {
    const addCommit = message => {
      console.log(this.state);
      if (this.state.currentBranch !== " ") {
        const branch = this.state.branches.find(
          b => b.name === this.state.currentBranch
        );
        if (branch) {
          console.log(branch);
          branch._graph.author = this.props.profile.name;
          branch.commit(message);
          branch._graph.commits[branch._graph.commits.length - 1].merge = null;
        }
      } else if (message) {
        // NONE THIS NEEDED ANYMORE
        this.state.gitgraph._graph.author = this.props.profile.name;
        this.state.gitgraph.commit(message);
        this.state.gitgraph._graph.commits[
          this.state.gitgraph._graph.commits.length - 1
        ].merge = null;
      }
    };

    const addBranch = branchName => {
      if (this.state.branches.map(b => b.name).includes(branchName)) return;
      const from = branches.find(from => from.name === this.state.currentBranch);
      this.setState(state => ({
        branches: [...state.branches, from.branch(branchName)]
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
        commands: [],
        firstTime: false
      });
    };

    const handleCheck = () => {
      const branch = this.state.gitgraph;
      console.log(this.state.branches);
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
          //merge comparison
          if (
            value.merge != null &&
            branch._graph.commits[index].merge != null
          ) {
            if (
              value.merge[0] != branch._graph.commits[index].merge[0] ||
              value.merge[1] != branch._graph.commits[index].merge[1]
            )
              return alert("They don't match");
          } else if (
            (value.merge == null &&
              branch._graph.commits[index].merge != null) ||
            (value.merge != null && branch._graph.commits[index].merge == null)
          ) {
            return alert("They don't match");
          }
          //merge comparison
        }
        this.setState({ complete: true});
        return alert("They DO match!");
      } else {
        return alert("They don't match");
      }
    };

    function toggleDisplay() {
      var x = document.getElementById("graphHide");
      var y = document.getElementById("graphHide2");
      if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
      } else {
        x.style.display = "none";
        y.style.display = "block";
      }
      const newHidden = !this.state.hidden;
      this.setState({ hidden: newHidden });
    }

    var errorMsg = " ";
    const handleCommand = () => {
      if(!this.state["command"]) {
        return;
      }
      const coms = this.state["command"].split(" ");
      if (coms[0] !== "git") {
        errorMsg = "Not recognised, start a command with git";
        this.setState({ error: errorMsg });
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
            this.setState({
              commands: this.state.commands.concat(this.state["command"])
            });
            return;
          }
          case "commit": {
            if (array[index + 1] === "-m") {
              let string = "";
              for (let i = 2; i < array.length; i++) {
                string += " " + array[index + i];
              }
              addCommit(string);
            this.setState({ error: " " });
            this.setState({
              commands: this.state.commands.concat(this.state["command"])
            });
            }
            else {
              errorMsg = "commit must be followed by -m";
              this.setState({ error: errorMsg });
            }
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
              this.setState({ error: " " });
              this.setState({
                commands: this.state.commands.concat(this.state["command"])
              });
            } else {
              errorMsg = "branch " + array[index + 1] + " does not exist";
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
              this.setState({
                commands: this.state.commands.concat(this.state["command"])
              });
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
              this.setState({
                commands: this.state.commands.concat(this.state["command"])
              });
            } else {
              if (array[index + 1] && !array[index + 2]) {
                errorMsg = "branch " + array[index + 1] + " does not exist";
              } else if (array[index + 1] && array[index + 2]) {
                if (
                  checkBranch(
                    array[index + 1].substring(1, array[index + 1].length - 1)
                  )
                ) {
                  errorMsg =
                    "branch " + array[index + 1] + " does not exist";
                } else if (
                  checkBranch(
                    array[index + 2].substring(1, array[index + 2].length - 1)
                  )
                ) {
                  errorMsg =
                    "branch " + array[index + 1] + " does not exist";
                } else {
                  errorMsg =
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

    const branches = this.state.branches;
    const options = {
      mode: Mode.Compact
    };
    const scrollContainerStyle = {
      width: "100%",
      height: "100px",
      maxHeight: "100px",
      marginTop: "20px",
      padding: "10px",
      outlineStyle: "auto",
      outlineColor: "grey"
    };

    var completeButton = <><p id="error">{this.state.error}</p>
    <input
      id="commandInput"
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
    </>;

    if(this.state.complete) {
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
                  {completeButton}
                </center>
              </form>
            </div>
            <Row id="clear_button">
              <Col>
                <Button
                  disabled={this.state.hidden}
                  variant="outline-danger"
                  onClick={clear}
                  href="/Level3"
                  block
                >
                  clear
                </Button>
              </Col>
              <Col>
                <Button variant="outline-success" onClick={handleCheck} block>
                  check answer
                </Button>
              </Col>
            </Row>
            <Button
              onClick={toggleDisplay.bind(this)}
              variant="warning"
              id="show"
            >
              show goal
            </Button>
            <Popup
              trigger={
                <Button variant="warning" id="help">
                  Help
                </Button>
              }
              modal
              closeOnDocumentClick
            >
              <div id="helpTop">
                <span> Help Menu </span>
              </div>
              <br></br>
              <a>Commit: git commit -m 'message'</a>
              <br></br>
              <a>
                Branch: git branch {"<"}branch_name{">"}
              </a>
              <br></br>
              <a>
                Checkout: git checkout {"<"}branch_name{">"}{" "}
              </a>
              <br></br>
              <a>
                Merge: git merge {"<"}branch_name{">"}
              </a>
              <br></br>
              <span> OR </span>
              <br></br>
              <a>
                Merge: git merge {"<"}
                branch_name{">"} {"<"}branch_name{">"}
              </a>
            </Popup>
          </Col>

          <Col align="center">
            <div id="graphHide">
              <Gitgraph>{gitgraph => this.setState({ gitgraph })}</Gitgraph>
            </div>
            <div id="graphHide2">
              <Gitgraph options={options}>
                {baseTree => {
                  const master = baseTree.branch("master");

                  master.commit("Init");

                  const development = baseTree.branch("development");

                  development.commit("Some changes");
                  development.commit("Some other changes");

                  master.merge(development);

                  this.setState({ goalTree: baseTree });
                }}
              </Gitgraph>
            </div>
          </Col>
        </Row>
      </div>
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
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(level3);
