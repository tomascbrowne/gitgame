export const addScore = score => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authId = getState().firbase.auth.uid;
    const newScore = getState().firebase.profile.score;
    newScore += 10;
    firestore
      .collection("users")
      .doc("score")
      .set({
        score: newScore
      })
      .then(() => {
        dispatch({ type: ADD_SCORE, newScore });
      })
      .catch(err => {
        dispatch({ type: "ADD_SCORE_ERROR", err });
      });
  };
};
