import { APP_ID } from "../constants/APP_ID.js";
import { DUMMY_API } from "../constants/DUMMY_API.js";

export async function getComments({ id }) {
  const response = await fetch(`${DUMMY_API}post/${id}/comment`, {
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
