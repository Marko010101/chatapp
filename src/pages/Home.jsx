import styled from "styled-components";

import SpinnerFullPage from "../ui/SpinnerFullPage.jsx";
import { usePosts } from "../features/posts/usePosts.js";
import Post from "../features/posts/Post.jsx";
import Empty from "../ui/Empty.jsx";
import { useUserFirebase } from "../features/users/useUserFirebase.js";
import { useUsers } from "../features/users/useUsers.js";

const StyledPosts = styled.main`
  width: 46rem;
`;

function Home() {
  const { isLoading, posts, error } = usePosts();
  /*   const { users } = useUsers();
  console.log(users);
  const { user: userFirebase } = useUserFirebase();
  const firebaseUsername = userFirebase;

  console.log(firebaseUsername);
  // const firebaseEmail = userFirebase.email;

  let currentDummyUser = null;

  if (users) {
    currentDummyUser = users.data.find((userDummy) => {
      userDummy.email === firebaseEmail;
    });
  } */

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
