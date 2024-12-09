import styled from "styled-components";
import SearchedUserPost from "./SearchedUserPost.jsx";

const StyledPosts = styled.div`
  display: grid;
  margin: 2rem 0;
  gap: 0.5rem;
  grid-template-columns: repeat(3, 1fr);
  width: 80rem;
`;

function ProfilePosts({ posts }) {
  const allPost = posts?.data;

  return (
    <StyledPosts>
      {allPost.map((post) => (
        <SearchedUserPost post={post} key={post?.id} />
      ))}
    </StyledPosts>
  );
}

export default ProfilePosts;
