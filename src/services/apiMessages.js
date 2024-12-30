import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../constants/firebaseConfig.js";

export async function sendMessage(text, senderId, receiverId) {
  if (!senderId || !receiverId) {
    console.error("Sender ID or Receiver ID is missing!");
    return;
  }

  if (!text.trim()) {
    console.error("Message text is empty!");
    return;
  }

  const chatId = [senderId, receiverId].sort().join("_");

  try {
    const chatDocRef = doc(firestore, `chats/${chatId}`);
    const docSnapshot = await getDoc(chatDocRef);

    const currentTime = Date.now(); // Get current timestamp in milliseconds

    if (!docSnapshot.exists()) {
      await setDoc(chatDocRef, {
        createdAt: currentTime,
        updatedAt: currentTime,
      });
    }

    const messageRef = collection(firestore, `chats/${chatId}/messages`);
    await addDoc(messageRef, {
      text,
      senderId,
      receiverId,
      createdAt: currentTime, // Pass the current timestamp directly
    });

    await updateDoc(chatDocRef, {
      updatedAt: currentTime, // Pass the current timestamp directly
    });

    console.log("Message sent and chat updated successfully!");
  } catch (error) {
    console.error("Error adding message: ", error);
  }
}

export const fetchChats = async () => {
  try {
    const chatsRef = collection(firestore, "chats");

    const querySnapshot = await getDocs(chatsRef);

    const chatDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return chatDocs;
  } catch (error) {
    console.error("Error retrieving chats: ", error);
    return [];
  }
};
