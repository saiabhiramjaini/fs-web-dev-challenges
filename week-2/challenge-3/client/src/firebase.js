// firebase.js

import firebase from "firebase/compat/app"; // Import firebase from compat/app
import "firebase/compat/messaging"; // Import messaging from compat/messaging
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAQoPUVj_M3cvvUqAGDdLxCrrEh6geIV5U",
  authDomain: "push-notifications-54dad.firebaseapp.com",
  databaseURL: "https://push-notifications-54dad-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "push-notifications-54dad",
  storageBucket: "push-notifications-54dad.appspot.com",
  messagingSenderId: "869369389686",
  appId: "1:869369389686:web:250b9b9ca8a96da4c5f557",
  measurementId: "G-91Z0GZC29V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();
export const database = firebase.database();