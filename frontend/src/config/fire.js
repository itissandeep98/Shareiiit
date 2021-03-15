import firebase from "firebase/app";
import "firebase/firestore";
require("firebase/auth");
require("firebase/database");

const json = require("./fire.json"); // fire.json is created at deploy time on github actions
var firebaseConfig = json;

const fire = firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
// fire.firestore().settings({ timestampsInSnapshots: true });
export default fire;
