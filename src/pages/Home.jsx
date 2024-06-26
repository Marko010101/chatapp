import styled from "styled-components";
import SpinnerFullPage from "../ui/SpinnerFullPage.jsx";
import { usePosts } from "../features/posts/usePosts.js";
import Post from "../features/posts/Post.jsx";
import Empty from "../ui/Empty.jsx";
import { useUserFirebase } from "../features/users/useUserFirebase.js";
import { useUsers } from "../features/users/useUsers.js";
import { matchFirebaseAndDummyUsers } from "../services/apiAuthFirebase.js";
import { useCurrentDummyUser } from "../features/users/useCurrentDummyUser.js";

const StyledPosts = styled.main`
  width: 46rem;
`;

function Home() {
  const { isLoading, posts, error } = usePosts();

  if (isLoading) return <SpinnerFullPage />;
  if (!posts.length) return <Empty resourceName="posts" />;
  return (
    <StyledPosts>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </StyledPosts>
  );
}

export default Home;
