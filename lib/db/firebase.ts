import firebase from "firebase";
import admin from "firebase-admin";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    ),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

export default firebase.firestore();
