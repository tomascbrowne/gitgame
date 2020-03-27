import firebase from "firebase";

export const setScore = score => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = firebase.firestore();
    const authId = getState().firebase.auth.uid;
    var newScore = getState().firebase.profile.score;
    newScore += 10;
    firestore
      .collection("users")
      .doc(authId)
      .update({
        score: newScore
      })
      .then(() => {
        dispatch({ type: "SET_SCORE" , newScore });
      })
      .catch(err => {
        dispatch({ type: "SET_SCORE_ERROR", err });
      });
  };
};
