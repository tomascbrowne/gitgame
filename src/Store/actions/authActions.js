import firebase from "firebase";

export const signIn = credentials => {
  return (dispatch, getState) => {
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
  return (dispatch, getState) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

// the .then's are due to the async calls
export const signUp = user => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = firebase.firestore();
    console.log(user);
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.username, user.password)
      .then(response => {
        return firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            score: 0,
            levelsCleared: 0
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
