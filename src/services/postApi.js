// Api website URL  -  https://dummyapi.io/

const APP_ID = "6650b8e02e95842fdb93f60f";

const RANDOM_NUM = Math.floor(Math.random() * 87) + 1;
// Total posts are 873

export async function getPosts() {
  // const response = await fetch(`https://dummyapi.io/data/v1/tag/mammal/post`, {

  console.log(RANDOM_NUM);

  const response = await fetch(
    `https://dummyapi.io/data/v1/post?page=${RANDOM_NUM}&limit=10`,
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
