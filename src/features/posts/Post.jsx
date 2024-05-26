import styled from "styled-components";

const StyledPost = styled.div`

`;

function Post({ post }) {
  const { id, image, likes, owner, publishDate, tags, text } = post;

  const {
    firstName: ownerFirstName,
    id: ownerId,
    lastName: ownerLastName,
    picture: ownerPicture,
    title: ownerTitle,
  } = owner;

  return <StyledPost>{ownerFirstName}</StyledPost>;
}

export default Post;
