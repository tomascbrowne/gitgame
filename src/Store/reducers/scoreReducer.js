const initialState = {
  score: null
};

const scoreReducer = (state = initialState) => {
    console.log(state.score);
  switch (action.type) {
    case "SET_SCORE":
      console.log("setting score");
      return {
        ...state,
        score: score
      };
    default:
      return state;
  }
};

export default scoreReducer;
