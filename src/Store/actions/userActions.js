export const createUser = user => {
  return (dispatch, getState) => {
    dispatch({ type: "CREATE_USER", user });
  };
};
