import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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

  try {
    const messageRef = collection(firestore, "messages");
    await addDoc(messageRef, {
      text,
      senderId,
      receiverId,
      createdAt: serverTimestamp(),
    });
    console.log("Message sent!");
  } catch (error) {
    console.error("Error adding message: ", error);
  }
}
