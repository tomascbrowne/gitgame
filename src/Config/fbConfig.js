import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyAp9xJP9Tolh1aMOx7_KrADoy8AAoP-91Y",
  authDomain: "rd-year-project-743e1.firebaseapp.com",
  databaseURL: "https://rd-year-project-743e1.firebaseio.com",
  projectId: "rd-year-project-743e1",
  storageBucket: "rd-year-project-743e1.appspot.com",
  messagingSenderId: "522848080111",
  appId: "1:522848080111:web:2b692954ed218631c68b1a",
  measurementId: "G-VEQP01VN2R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize Firestore
firebase.firestore();

export default firebase;
