import styled from "styled-components";

import Heading from "../../ui/Heading.jsx";
import PostInfo from "./PostInfo.jsx";
import OwnerImage from "./OwnerImage.jsx";
import PostFormatedDate from "./PostFormatedDate.jsx";
import ActionButtonDots from "../../ui/ActionButtonDots.jsx";
import { fixedSizeFullName } from "../../utils/helpers.js";

const StyledPost = styled.ul`
  margin-top: 2rem;
`;

const PostContainer = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 58rem max-content;
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
  max-width: 46rem;
  overflow: hidden;

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-tiny);
  }
`;

function Post({ post }) {
  const { id, image, likes, owner, publishDate, tags, text } = post;

  const {
    firstName: ownerFirstName,
    lastName: ownerLastName,
    // id: ownerId,
    picture: ownerPicture,
    // title: ownerTitle,
  } = owner;

  return (
    <StyledPost>
      <PostContainer>
        <HeaderPost>
          <OwnerImage ownerPicture={ownerPicture} />
          <Heading as="h4">
            {fixedSizeFullName(ownerFirstName, ownerLastName, 25)}
          </Heading>
          <PostFormatedDate date={publishDate} />
          <ActionButtonDots />
        </HeaderPost>
        <PostImg>
          <img src={image} alt="Post image" />
        </PostImg>
        <PostInfo likes={likes} text={text} id={id} />
      </PostContainer>
    </StyledPost>
  );
}

export default Post;
