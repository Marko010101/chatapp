import styled from "styled-components";

import Heading from "../../ui/Heading.jsx";
import PostInfo from "./PostInfo.jsx";
import OwnerImage from "./ui/OwnerImage.jsx";
import PostFormatedDate from "./ui/PostFormatedDate.jsx";
import ActionButtonDots from "./ui/ActionButtonDots.jsx";
import { fixedSizeFullName } from "../../utils/helpers.js";

const StyledPost = styled.ul``;

const PostContainer = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem max-content max-content;
  row-gap: 0.5rem;
`;

const HeaderPost = styled.header`
  display: grid;
  grid-template-columns: repeat(2, max-content) 1fr max-content;
  align-items: center;
  column-gap: 2rem;

  & p {
  }

  & span {
    width: 2.5rem;
    height: 2.5rem;

    & > svg {
      width: 100%;
      height: 100%;
    }
  }
`;
const PostImg = styled.div`
  width: 100%;
  max-width: 48rem;
  overflow: hidden;

  & img {
    object-fit: cover;
    width: 100%;
    height: 58rem;
    border-radius: var(--border-radius-tiny);
  }
`;

function Post({ post }) {
  const { image, owner, publishDate } = post;

  const {
    firstName: ownerFirstName,
    lastName: ownerLastName,
    picture: ownerPicture,
  } = owner;

  return (
    <StyledPost>
      <PostContainer>
        <HeaderPost>
          <OwnerImage ownerPicture={ownerPicture} haveBorder={true} />
          <Heading as="h4">
            {fixedSizeFullName(ownerFirstName, ownerLastName, 25)}
          </Heading>
          <PostFormatedDate date={publishDate} />
          <ActionButtonDots />
        </HeaderPost>
        <PostImg>
          <img src={image} alt="Post image" />
        </PostImg>
        <PostInfo post={post} />
      </PostContainer>
    </StyledPost>
  );
}

export default Post;
