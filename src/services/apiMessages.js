import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../constants/firebaseConfig.js";
import { deleteDoc } from "firebase/firestore";

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

    const currentTime = Date.now();

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
      createdAt: currentTime,
    });

    await updateDoc(chatDocRef, {
      updatedAt: currentTime,
    });
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

export const deleteChat = async (chatId) => {
  try {
    const ref = doc(firestore, "chats", chatId);
    await deleteDoc(ref);
    return true;
  } catch (err) {
    console.error("Error deleting chat:", err);
    throw err;
  }
};
