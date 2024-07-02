import { APP_ID } from "../constants/APP_ID.js";
import { DUMMY_API } from "../constants/DUMMY_API.js";

export async function getComments({ postId }) {
  const response = await fetch(`${DUMMY_API}post/${postId}/comment`, {
    headers: {
      "app-id": APP_ID,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Post comments could not be searched, status: ${response.status}`
    );
  }

  const result = await response.json();

  return result;
}

export async function createComment(comment, ownerId, postId) {
  console.log(comment);
  const payload = {
    message: comment,
    owner: ownerId.id,
    post: postId,
  };

  console.log("Payload being sent:", payload);

  const response = await fetch(`${DUMMY_API}comment/create`, {
    method: "POST",
    headers: {
      "app-id": APP_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Server response:", errorDetails);
    throw new Error(`Could not create comment, status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function getCommentsByUser({ id }) {
  const response = await fetch(`${DUMMY_API}user/${id}/comment`, {
    headers: {
      "app-id": APP_ID,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Comments could not be searched, status: ${response.status}`
    );
  }

  const result = await response.json();

  return result;
}
