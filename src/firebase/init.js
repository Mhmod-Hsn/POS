/* eslint-disable */

import firebase from "firebase/app";
import firestore from "@firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC3NgYAUJdA9DV0WQK9t6E8syIaMKSHhvM",
  authDomain: "pos-inventory-system.firebaseapp.com",
  databaseURL: "https://pos-inventory-system.firebaseio.com",
  projectId: "pos-inventory-system",
  storageBucket: "pos-inventory-system.appspot.com",
  messagingSenderId: "866034208651",
  appId: "1:866034208651:web:fa91f0cc0094e64ad6698e"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
