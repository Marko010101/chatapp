import styled from "styled-components";

import SpinnerFullPage from "../ui/SpinnerFullPage.jsx";
import { usePosts } from "../features/posts/usePosts.js";
import Post from "../features/posts/Post.jsx";
import Empty from "../ui/Empty.jsx";
import { useUserFirebase } from "../features/users/useUserFirebase.js";
import { useUsers } from "../features/users/useUsers.js";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../services/apiDummyUser.js";

const StyledPosts = styled.main`
  width: 46rem;
`;

function Home() {
  const { isLoading, posts, error } = usePosts();
  const { user } = useUserFirebase();
  const { dummyUsers } = useUsers();

  // console.log(user);
  // console.log(dummyUsers?.data);

  console.log(user.uid);
  console.log(dummyUsers);
  const newId = user.uid;
  const changes = { id: newId };
  updateUser("6670823117660c170a5e9dea", changes);

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
