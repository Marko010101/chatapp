import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "petfolio-f29a4.firebaseapp.com",
  projectId: "petfolio-f29a4",
  storageBucket: "petfolio-f29a4.appspot.com",
  messagingSenderId: "470796474442",
  appId: "1:470796474442:web:b00ec07c2e7530ed4e2eb3",
  measurementId: "G-XMSSETPLQ9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
