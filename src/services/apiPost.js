import { APP_ID } from "../constants/APP_ID.js";
import { DUMMY_API } from "../constants/DUMMY_API.js";

const totalPages = 87;
const postsPerPage = 10;

const RandomPageNumber = Math.floor(Math.random() * totalPages) + 1;
// Total posts are 873

export async function getPosts() {
  // const response = await fetch(`https://dummyapi.io/data/v1/tag/mammal/post`, {

  const response = await fetch(
    `${DUMMY_API}post?page=${RandomPageNumber}&limit=${postsPerPage}`,
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
