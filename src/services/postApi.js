// Api website URL  -  https://dummyapi.io/

const APP_ID = "6650b8e02e95842fdb93f60f";

export async function getPosts() {
  const response = await fetch(`https://dummyapi.io/data/v1/tag`, {
    headers: {
      "app-id": APP_ID,
    },
  });

  if (!response.ok) {
    throw new Error(`Searching could not be done, status: ${response.status}`);
  }

  const result = await response.json();
  console.log(result);

  return result;
}
