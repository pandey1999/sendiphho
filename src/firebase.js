
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBGfd3y0gwtNb4PzY1kn5EfzR-1KTImKbw",
    authDomain: "snapchat-clone-a4be2.firebaseapp.com",
    projectId: "snapchat-clone-a4be2",
    storageBucket: "snapchat-clone-a4be2.appspot.com",
    messagingSenderId: "466791749873",
    appId: "1:466791749873:web:26f9f728b4e7393a177150",
    measurementId: "G-Y2NE5BF1WG"
};
/*
const firebaseConfig = {
    apiKey: "AIzaSyBADm03S3XoT3qlqOnPb_KeIW_ybJvyg74",
    authDomain: "snapchat-af18d.firebaseapp.com",
    projectId: "snapchat-af18d",
    storageBucket: "snapchat-af18d.appspot.com",
    messagingSenderId: "965890576345",
    appId: "1:965890576345:web:71068e5987f7be553513c8",
    measurementId: "G-5WQZ5X0FW8"
  };*/
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider =new firebase.auth.GoogleAuthProvider();

export{db,auth,storage,provider};
