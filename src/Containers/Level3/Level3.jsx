import React, { Component } from "react";
import { Gitgraph, Mode } from "@gitgraph/react";
import { router } from "react-router";

class level3 extends Component {
  state = {};

  onCommitClick = () => {
    console.log("please end my suffering");
    return this.props.router.push("./Home");
  };

  render() {
    const options = {
      mode: Mode.Compact
    };
    return (
      <Gitgraph>
        {gitgraph => {
          const master = gitgraph.branch("master");

          master.commit({
            subject: "Init project",
            onClick: this.onCommitClick
          });

          master.commit("Add tests").commit("Implement a feature");

          const newFeature = gitgraph.branch("feature-1");
          const newFeature2 = gitgraph.branch("feature-2");
          newFeature2.commit("Added some cool stuff");
          newFeature.commit("Added some cool stuff");

          master.commit("Hotfixed something");
          newFeature.commit("Fix tests");

          master.merge(newFeature, "Release a new version");
        }}
      </Gitgraph>
    );
  }
}

export default level3;
