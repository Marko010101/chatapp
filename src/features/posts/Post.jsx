import styled from "styled-components";

import PostInfo from "./PostInfo.jsx";
import OwnerImage from "./ui/OwnerImage.jsx";
import PostFormatedDate from "./ui/PostFormatedDate.jsx";
import ActionButtonDots from "./ui/ActionButtonDots.jsx";
import Row from "../../ui/Row.jsx";
import useHover from "../../hooks/useHover.js";
import { useUserById } from "../users/hooks/useUserById.js";
import UserProfileOnHover from "../users/UserProfileOnHover.jsx";
import StyledErrorText from "../../ui/StyledErrorText.jsx";
import UserName from "../users/ui/UserName.jsx";
import { RelativeDiv } from "../../ui/RelativeDiv.jsx";

function Post({ post, innerRef }) {
  const { image, owner, publishDate } = post;
  const {
    isHovered: isImageHovered,
    handleMouseEnter: handleImageMouseEnter,
    handleMouseLeave: handleImageMouseLeave,
  } = useHover();
  const {
    isHovered: isHeaderHovered,
    handleMouseEnter: handleHeaderMouseEnter,
    handleMouseLeave: handleHeaderMouseLeave,
  } = useHover();
  const {
    firstName: ownerFirstName,
    lastName: ownerLastName,
    picture: ownerPicture,
    id: ownerId,
  } = owner;

  const { userById, isLoading, error } = useUserById(ownerId);

  if (isLoading) return;
  if (error) return <StyledErrorText>{error}</StyledErrorText>;

  return (
    <StyledPost>
      <PostContainer>
        <HeaderPost ref={innerRef}>
          <StyledRow
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
          >
            <OwnerImage
              ownerPicture={ownerPicture}
              haveBorder={true}
              id={ownerId}
            />
            {isImageHovered && <UserProfileOnHover user={userById} />}
          </StyledRow>
          <RelativeDiv
            onMouseEnter={handleHeaderMouseEnter}
            onMouseLeave={handleHeaderMouseLeave}
          >
            <UserName
              firstName={ownerFirstName}
              lastName={ownerLastName}
              length={25}
              heading="h4"
              id={ownerId}
            />
            {isHeaderHovered && <UserProfileOnHover user={userById} />}
          </RelativeDiv>
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

const StyledPost = styled.ul``;

const PostContainer = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem max-content max-content;
  row-gap: 0.5rem;

  @media (max-width: 576px) {
    width: calc(100vw - 10rem);
  }
  @media (max-width: 360px) {
    width: calc(100vw - 2.5rem);
  }
`;

const HeaderPost = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, max-content) 1fr max-content;
  align-items: center;
  column-gap: 2rem;

  & h4 {
    cursor: pointer;
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
  @media (max-width: 576px) {
    max-width: 100%;
  }
`;
const StyledRow = styled(Row)`
  position: relative;
`;
