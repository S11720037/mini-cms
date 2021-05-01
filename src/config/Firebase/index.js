// don't do this for production server

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB0jHToKn_5i_y0325WxyA01LCFZ1VzWcY",
  authDomain: "final-project-backend-41ac1.firebaseapp.com",
  projectId: "final-project-backend-41ac1",
  storageBucket: "final-project-backend-41ac1.appspot.com",
  messagingSenderId: "687247481455",
  appId: "1:687247481455:web:a845ad550972832f5b4b9a",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
