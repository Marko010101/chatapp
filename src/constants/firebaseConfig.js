// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIkSB-WQANGe6CsRjCwvUS0pB80IvYdN8",
  authDomain: "petfolio-f29a4.firebaseapp.com",
  projectId: "petfolio-f29a4",
  storageBucket: "petfolio-f29a4.appspot.com",
  messagingSenderId: "470796474442",
  appId: "1:470796474442:web:b00ec07c2e7530ed4e2eb3",
  measurementId: "G-XMSSETPLQ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
