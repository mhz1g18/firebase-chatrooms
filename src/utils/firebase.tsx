import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDMaoIYROv6pMp-kuGG1-hZ-VQRUgF7iq4",
  authDomain: "chatroom-904d0.firebaseapp.com",
  projectId: "chatroom-904d0",
  storageBucket: "chatroom-904d0.appspot.com",
  messagingSenderId: "620706504456",
  appId: "1:620706504456:web:f10f9366e67df2578156bd",
  measurementId: "G-RS7F424HR8",
};
firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
