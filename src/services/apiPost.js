import { APP_ID } from "../constants/APP_ID.js";
import { DUMMY_API } from "../constants/DUMMY_API.js";

// const totalPosts = 873;
// const postsPerPage = 10;
// const RandomPageNumber = Math.floor(Math.random() * totalPages) + 1;

export async function getPostsTotalLength() {
  const response = await fetch(`${DUMMY_API}post`, {
    headers: {
      "app-id": APP_ID,
    },
  });

  if (!response.ok) {
    throw new Error(`Posts could not be completed, status: ${response.status}`);
  }

  const result = await response.json();

  return result.total;
}

/* export async function getPosts() {
  const totalPosts = await getPostsTotalLength();
  const postsPerPage = 10;

  const lastPage = Math.floor(totalPosts / postsPerPage);

  const response = await fetch(
    `${DUMMY_API}post?page=${lastPage}&limit=${postsPerPage}`,
    {
      headers: {
        "app-id": APP_ID,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Posts could not be completed, status: ${response.status}`);
  }

  const result = await response.json();

  return result;
} */

// const postsPerPage = 10;
// const totalPosts = await getPostsTotalLength();
// const RandomPageNumber =
//   Math.floor((Math.random() * totalPosts) / postsPerPage) + 1;

export async function getPosts({ pageParam }) {
  const response = await fetch(
    `${DUMMY_API}post?page=${pageParam}&limit=${10}`,
    {
      headers: {
        "app-id": APP_ID,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Posts could not be completed, status: ${response.status}`);
  }

  const result = await response.json();

  return result;
}

export async function getPostsByUser(id) {
  const response = await fetch(`${DUMMY_API}user/${id}/post`, {
    headers: {
      "app-id": APP_ID,
    },
  });

  if (!response.ok) {
    throw new Error(`Users posts could not load, status: ${response.status}`);
  }

  const result = await response.json();

  return result;
}

export async function getPostById(id) {
  const response = await fetch(`${DUMMY_API}post/${id}`, {
    headers: {
      "app-id": APP_ID,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Post with this id is not available, status: ${response.status}`
    );
  }

  const result = await response.json();

  return result;
}

export async function updatePost(id, updatedPostData) {
  const response = await fetch(`${DUMMY_API}post/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "app-id": APP_ID,
    },
    method: "PUT",
    body: JSON.stringify(updatedPostData),
  });

  if (!response.ok) {
    throw new Error(`Could not update post, status: ${response.status}`);
  }

  const result = await response.json();

  return result;
}
