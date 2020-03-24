import firebase from "firebase";

export const signIn = credentials => {
  return (dispatch, getState) => {
    console.log(credentials);
    const username = credentials.username.concat("@fake.com");
    firebase
      .auth()
      .signInWithEmailAndPassword(username, credentials.password)
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
    const username = user.username.concat("@fake.com");
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, user.password)
      .then(response => {
        return firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            name: user.username,
            score: 0,
            levelsCleared: 0,
            ta: false
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
