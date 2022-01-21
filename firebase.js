// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyDTsBjV6dOdiOyfWxWNU1BubfX-SFTrNsk",
    authDomain: "wardrobeapp-4464f.firebaseapp.com",
    projectId: "wardrobeapp-4464f",
    storageBucket: "wardrobeapp-4464f.appspot.com",
    messagingSenderId: "481155318965",
    appId: "1:481155318965:web:aeb90467f07ea4b4bc6afc",
    measurementId: "G-03Z58BRW79"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const { serverTimestamp } = firebase.firestore.FieldValue;