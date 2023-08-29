// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5368NWJezIR6loxQqtH6NWcsKkt3btX0",
  authDomain: "clone-c09d3.firebaseapp.com",
  projectId: "clone-c09d3",
  storageBucket: "clone-c09d3.appspot.com",
  messagingSenderId: "23543849645",
  appId: "1:23543849645:web:853e98b923349a71a55c24",
  measurementId: "G-9DWHEJ47SE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);