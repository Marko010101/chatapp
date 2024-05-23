export const searchGoogle = async (query) => {
  const myHeaders = new Headers();
  myHeaders.append("X-API-KEY", "9293c1e7cbf9e7379f2753d137ab670a167db163");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ q: query });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    "https://google.serper.dev/search",
    requestOptions
  );

  if (!response.ok) {
    throw new Error(`Searching could not be done, status: ${response.status}`);
  }

  const result = await response.json();
  return { result };
};
