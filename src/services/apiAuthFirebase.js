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
import { getDummyUserByUid } from "../utils/getDummyIdByUid.js";

export const registerUser = async ({ email, password, dummyId }) => {
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

export const fetchUserCollection = async () => {
  const userCollectionRef = collection(firestore, "usersCollection");
  const snapshot = await getDocs(userCollectionRef);

  const users = snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  }));

  return users;
};

export const fetchCurrentUsersCollectionUser = async (uid) => {
  try {
    const users = await fetchUserCollection();

    const matchedUser = users.find(
      (user) => user.dummyIdUser === uid || user.uid === uid
    );

    return matchedUser?.dummyIdUser || null;
  } catch (error) {
    console.error("Error fetching current user's collection user:", error);
    throw error;
  }
};

export const matchFirebaseAndDummyUsers = async (userUid, dummyUsers) => {
  const currentUser = await fetchCurrentUsersCollectionUser(userUid);

  if (!currentUser) {
    return null;
  }

  const matchingDummyId = getDummyUserByUid(dummyUsers, currentUser);

  if (matchingDummyId) {
    return await getUserById(matchingDummyId.id);
  } else {
    console.log("No matching dummy user found");
    return null;
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
