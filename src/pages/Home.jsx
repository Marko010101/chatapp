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
import { fetchCurrentUsersCollectionUser } from "../services/apiAuthFirebase.js";

const StyledPosts = styled.main`
  width: 46rem;
`;

function Home() {
  const { isLoading, posts, error } = usePosts();
  const { dummyUsers } = useUsers();
  const { user } = useUserFirebase();

  const userUid = user?.uid;

  const fetchAndProcessUser = async (userUid) => {
    const currentUser = await fetchCurrentUsersCollectionUser(userUid);

    const matchingUser = dummyUsers?.data.find(
      (user) => user.id === currentUser
    );

    if (matchingUser) {
      return getUserById(matchingUser.id);
    } else {
      return null;
    }
  };

  const currentUser = fetchAndProcessUser(userUid);

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
