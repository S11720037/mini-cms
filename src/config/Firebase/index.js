// don't do this for production server

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0jHToKn_5i_y0325WxyA01LCFZ1VzWcY",
  authDomain: "final-project-backend-41ac1.firebaseapp.com",
  projectId: "final-project-backend-41ac1",
  storageBucket: "final-project-backend-41ac1.appspot.com",
  messagingSenderId: "687247481455",
  appId: "1:687247481455:web:a845ad550972832f5b4b9a",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebase.database();
const auth = firebase.auth();

export { storage, database, auth };
