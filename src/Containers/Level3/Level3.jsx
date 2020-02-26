import * as React from "react";
import { Gitgraph } from "@gitgraph/react";
//import "./BigManTing.css";
// eslint-disable @typescript-eslint/explicit-function-return-type

class level3 extends React.Component {
  constructor() {
    super();
    this.state = {
      branches: [],
      currentBranch: " ",
      error: null
    };
  }

  render() {
    const addCommit = message => {
      if (this.state.currentBranch !== " ") {
        const branch = this.state.branches.find(
          b => b.name === this.state.currentBranch
        );
        if (branch) {
          branch.commit(this.state[`message${this.state.currentBranch.name}`]);
        }
      } else if (message) {
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
        error: null
      });
    };

    const handleCommand = () => {
      const coms = this.state["command"].split(" ");
      if (coms[0] !== "git") {
        alert(coms[0] + "is not recognised");
      }
      coms.slice(1).forEach((com, index, array) => {
        this.setState({ error: null });
        switch (com) {
          case "branch": {
            if (array[index + 1] && array[index + 1].match(/\<.*?\>/g)) {
              addBranch(
                array[index + 1].substring(1, array[index + 1].length - 1)
              );
            }
            return;
          }
          case "commit": {
            if (array[index + 1] === "-m") {
              addCommit(array[index + 2]);
            }
            return;
          }
          case "checkout": {
            const check = checkBranch(
              array[index + 1].substring(1, array[index + 1].length - 1)
            );
            console.log(check);
            if (
              array[index + 1] &&
              array[index + 1].match(/\<.*?\>/g) &&
              check
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
          // THIS WHAT I WORKING ON
          case "merge": {
            mergeBranch(
              this.state.currentBranch,
              array[index + 1].substring(1, array[index + 1].length - 1)
            );
            return;
          }
        }
      });
    };

    const branches = this.state.branches;
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
        {this.state.error ? <div>{this.state.error}</div> : null}

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
        <button
          onClick={clear}
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          clear
        </button>
        <br />
        <Gitgraph>{gitgraph => this.setState({ gitgraph })}</Gitgraph>
      </div>
    );
  }
}

export default level3;
