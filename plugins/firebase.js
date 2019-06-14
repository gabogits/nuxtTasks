import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");


const firebaseConfig = {
    apiKey: "****",
    authDomain: "****",
    databaseURL: "****",
    projectId: "****",
    storageBucket: "****",
    messagingSenderId: "****",
    appId: "****"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, db, auth, storage }