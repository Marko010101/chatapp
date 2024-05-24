import { getPosts } from "../services/postApi.js";

function Home() {
  getPosts();

  return <div>get data</div>;
}

export default Home;
