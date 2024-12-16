import styled from "styled-components";

import PostInfo from "./PostInfo.jsx";
import PostFormatedDate from "./ui/PostFormatedDate.jsx";
import ActionButtonDots from "./ui/ActionButtonDots.jsx";
import Row from "../../ui/Row.jsx";
import { useUserById } from "../users/hooks/useUserById.js";
import HoveredImg from "../users/ui/hoverComponentsCard/HoveredImg.jsx";
import HoveredName from "../users/ui/hoverComponentsCard/HoveredUsername.jsx";
import ErrorDisplay from "../../ui/ErrorDisplay.jsx";
import SpinnerFullPage from "../../ui/loaders/SpinnerFullPage.jsx";

function Post({ post, innerRef }) {
  const { image, owner, publishDate } = post;
  const { id: ownerId } = owner;

  const { userById, isLoading, error } = useUserById(ownerId);
  if (isLoading)
    return (
      <Row type="horizontal-center">
        <SpinnerFullPage />
      </Row>
    );
  if (error) return <ErrorDisplay error={error} />;

  return (
    <StyledPost>
      <PostContainer>
        <HeaderPost ref={innerRef}>
          <HoveredImg user={userById} haveBorder={true} />
          <HoveredName user={userById} />
          <PostFormatedDate date={publishDate} />
          <ActionButtonDots post={post} />
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
  margin-top: 1.6rem;
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
  justify-content: center;
  column-gap: 2rem;

  & > div {
    align-self: center;
  }

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
