// Api website URL  -  https://dummyapi.io/

const APP_ID = "6650b8e02e95842fdb93f60f";

const totalPages = 87;
const postsPerPage = 10;

const RandomPageNumber = Math.floor(Math.random() * totalPages) + 1;
// Total posts are 873

export async function getPosts() {
  // const response = await fetch(`https://dummyapi.io/data/v1/tag/mammal/post`, {

  const response = await fetch(
    `https://dummyapi.io/data/v1/post?page=${RandomPageNumber}&limit=${postsPerPage}`,
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

export async function getComments({ id }) {
  const response = await fetch(
    `https://dummyapi.io/data/v1/post/${id}/comment`,
    {
      headers: {
        "app-id": APP_ID,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Post comments could not be searched, status: ${response.status}`
    );
  }

  const result = await response.json();

  return result;
}
