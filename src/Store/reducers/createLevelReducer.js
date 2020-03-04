import { SET_GRAPH } from "../actions/types";
import { actionTypes } from "redux-firestore";

const initialState = {
  graph: null
};

const createLevelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GRAPH":
      console.log("setting graph");
      return {
        ...state,
        setgraph: actionTypes.payload
      };
    default:
      return state;
  }
};

export default createLevelReducer;
