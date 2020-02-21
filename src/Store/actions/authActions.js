import firebase from "firebase";

export const signIn = credentials => {
  return (dispatch, getState) => {
    //const firebase = getFirebase();
    console.log(credentials);
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.username, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};
