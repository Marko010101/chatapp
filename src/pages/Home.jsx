import styled from "styled-components";

import SpinnerFullPage from "../ui/SpinnerFullPage.jsx";
import { usePosts } from "../features/posts/usePosts.js";
import Post from "../features/posts/Post.jsx";
import Empty from "../ui/Empty.jsx";

const StyledPosts = styled.main`
  max-width: 70rem;
`;

function Home() {
  const { isLoading, posts, error } = usePosts();

  console.log(posts);
  if (isLoading) return <SpinnerFullPage />;

  if (!posts.length) return <Empty resourceName="posts" />;
  // const postsArray = posts ?? [];

  return (
    <StyledPosts>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </StyledPosts>
  );
}

export default Home;
