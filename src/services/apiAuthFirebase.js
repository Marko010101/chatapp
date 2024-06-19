import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../constants/firebaseConfig.js";

// Registration
export const registerUser = async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  return { user };
};

// export const registerUser = async ({ email, password, id }) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // Add the custom ID to Firestore
//     await setDoc(doc(firestore, "users", user.uid), {
//       email: user.email,
//       customId: id,
//     });

//     return { ...user, customId: id };
//   } catch (error) {
//     console.error("Error registering user:", error);
//     throw error;
//   }
// };

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
