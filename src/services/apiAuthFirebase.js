import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { auth, firestore } from "../constants/firebaseConfig.js";

import { doc, setDoc } from "firebase/firestore";

import { collection, getDocs } from "firebase/firestore";
import { getUserById } from "./apiDummyUser.js";

export const registerUser = async ({ email, password, dummyId }) => {
  // Create a new user with email and password
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(firestore, "usersCollection", user.uid), {
    email: user.email,
    dummyIdUser: dummyId,
  });

  return { user };
};

/**
 * Fetches the dummyIdUser from 'usersCollection' in Firestore based on UID match.
 * @param {string} uid - The UID of the Firebase authenticated user.
 * @returns {Promise<string|null>} The dummyIdUser if found, otherwise null.
 */
export const fetchCurrentUsersCollectionUser = async (uid) => {
  try {
    const usersCollectionRef = collection(firestore, "usersCollection");
    const usersCollection = await getDocs(usersCollectionRef);

    let matchedDummyIdUser = null;

    usersCollection.forEach((doc) => {
      const userData = doc.data();
      const { dummyIdUser } = userData;
      if (doc.id === uid || dummyIdUser === uid) {
        matchedDummyIdUser = dummyIdUser;
      }
    });
    return matchedDummyIdUser;
  } catch (error) {
    console.error("Error fetching users collection:", error);
    throw error;
  }
};

export const matchFirebaseAndDummyUsers = async (userUid, dummyUsers) => {
  const currentUser = await fetchCurrentUsersCollectionUser(userUid);

  const matchingUser = await dummyUsers?.find(
    (user) => user.id === currentUser
  );
  if (matchingUser) {
    return await getUserById(matchingUser.id);
  } else {
    return "";
  }
};

export const logInUser = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const logOutUser = async () => {
  await signOut(auth);
};

export const getCurrentFirebaseUser = () => {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    }
  });
};
