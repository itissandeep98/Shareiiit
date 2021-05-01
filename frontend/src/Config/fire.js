import firebase from "firebase/app";
require("firebase/storage");

var firebaseConfig = {
  apiKey: "AIzaSyCVqYfMUIyBlRqE4S3d-0z3KetkAxG9Pj0",
  authDomain: "rsplat-dde9e.firebaseapp.com",
  projectId: "rsplat-dde9e",
  storageBucket: "rsplat-dde9e.appspot.com",
  messagingSenderId: "107586975868",
  appId: "1:107586975868:web:ad9a36ec530ce1fb4071f9",
};

const fire = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export default fire;
