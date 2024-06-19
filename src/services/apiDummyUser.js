import toast from "react-hot-toast";
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

const LIMIT = 50;
const PAGE = 2;

export async function getUsers() {
  // const response = await fetch(`${DUMMY_API}user?page=${PAGE}&limit=${LIMIT}`, {
  const response = await fetch(`${DUMMY_API}user?created=1`, {
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

export async function updateUser(id, changes) {
  const { email, ...allowedChanges } = changes;

  const body = JSON.stringify(allowedChanges);

  const response = await fetch(`${DUMMY_API}user/${id}`, {
    method: "PUT",
    headers: {
      "app-id": APP_ID,
      "Content-Type": "application/json", // Ensure content type is JSON
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error(`Could not update user, status: ${response.status}`);
  }

  const result = await response.json();
  console.log(result);
  return result;
}

export async function deleteUser(id) {
  const response = await fetch(`${DUMMY_API}user/${id}`, {
    method: "DELETE",
    headers: {
      "app-id": APP_ID,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not delete user, status: ${response.status}`);
  } else {
    toast.success(`User deleted succesfully!`);
  }

  const result = await response.json();
  return result;
}
