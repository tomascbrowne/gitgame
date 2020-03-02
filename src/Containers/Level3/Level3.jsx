import * as React from "react";
import { Gitgraph, Mode } from "@gitgraph/react";
import { Row, Col } from "react-bootstrap";
// eslint-disable @typescript-eslint/explicit-function-return-type

class level3 extends React.Component {
  constructor() {
    super();
    this.state = {
      branches: [],
      currentBranch: " ",
      error: " ",
      goalTree: null
    };
  }

  render() {
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
        error: " "
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

    const handleCommand = () => {
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

    const branches = this.state.branches;
    const options = {
      mode: Mode.Compact
    };
    return (
      <div id="container">
        <form
          id="commandLine"
          onSubmit={e => {
            e.preventDefault();
            handleCommand();
          }}
        >
          <input
            type="text"
            value={this.state.command}
            onChange={handleChange("command")}
          />
          <button>Enter Command</button>
        </form>

        <form
          onSubmit={e => {
            e.preventDefault();
            addCommit();
          }}
        >
          <input
            type="text"
            value={this.state.commitMessage}
            onChange={handleChange("commitMessage")}
          />
          <button>Commit on HEAD</button>
        </form>
        <form
          onSubmit={e => {
            e.preventDefault();
            addBranch();
          }}
        >
          <input type="text" onChange={handleChange("branchName")} />
          <button>Add a branch</button>
        </form>
        {branches.map(branch => (
          <form
            key={branch.name}
            onSubmit={e => {
              e.preventDefault();
              addCommit(branch);
            }}
          >
            <input
              type="text"
              value={this.state[`commitMessage${branch.name}`]}
              onChange={handleChange(`commitMessage${branch.name}`)}
            />
            <button>Commit on {branch.name}</button>
          </form>
        ))}
        {branches.map(to =>
          branches
            .filter(from => to.name !== from.name)
            .map(from => (
              <button
                key={`${to.name}->${from.name}`}
                onClick={() => from.merge(to)}
              >
                Merge {to.name} into {from.name}
              </button>
            ))
        )}
        <div>{this.state.currentBranch}</div>
        <div>{this.state.error}</div>
        <button
          onClick={clear}
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          clear
        </button>
        <button
          onClick={handleCheck}
          style={{ position: "absolute", right: 20, top: 20 }}
        >
          check answer
        </button>
        <br />
        <Row className="d-flex flex-row align-self-center p-2 h-100">
          <Col>
            <Gitgraph>{gitgraph => this.setState({ gitgraph })}</Gitgraph>
          </Col>
          <Col>
            <Gitgraph options={options}>
              {baseTree => {
                const master = baseTree.branch("master");

                master.commit("Add tests");

                const development = baseTree.branch("development");

                development.commit("Init");

                const feature = baseTree.branch("feature_branch");

                feature.commit("Added some cool stuff");
                feature.commit("Added some other cool stuff");

                this.setState({ goalTree: baseTree });
              }}
            </Gitgraph>
          </Col>
        </Row>
      </div>
    );
  }
}

export default level3;
