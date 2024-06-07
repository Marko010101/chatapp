import { APP_ID } from "../constants/APP_ID.js";
import { DUMMY_API } from "../constants/DUMMY_API.js";

export async function createUser(firstName, lastName, email) {
  const response = await fetch(`${DUMMY_API}user/create`, {
    method: "POST",
    headers: {
      "app-id": APP_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
    }),
  });

  if (!response.ok) {
    throw new Error(`Could not register user, status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

const LIMIT = 20; // Default limit per page
const PAGE = 5;

export async function getUsers() {
  const response = await fetch(`${DUMMY_API}user?page=${PAGE}&limit=${LIMIT}`, {
    headers: {
      "app-id": APP_ID,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not load users, status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function getUserById(id) {
  const response = await fetch(`${DUMMY_API}user/${id}`, {
    headers: {
      "app-id": APP_ID,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not load users, status: ${response.status}`);
  }

  const result = await response.json();

  console.log(result);
  return result;
}
