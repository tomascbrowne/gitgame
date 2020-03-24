import { SET_GRAPH } from "../actions/types";

export function getGraph(graph) {
  console.log("level Action");
  console.log(graph);
  return {
    type: SET_GRAPH,
    setGraph: graph
  };
}
