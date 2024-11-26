import styled from "styled-components";
import { useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Comment from "./ui/Comment.jsx";
import { useModalPostById } from "./hooks/useModalPostById.js";
import SpinnerFullPage from "../../ui/loaders/SpinnerFullPage.jsx";
import OwnerImage from "./ui/OwnerImage.jsx";
import ActionButtonDots from "./ui/ActionButtonDots.jsx";
import InputComment from "./InputComment.jsx";
import Likes from "./ui/Likes.jsx";
import PostFormatedDate from "./ui/PostFormatedDate.jsx";
import ErrorText from "../../ui/ErrorText.jsx";
import { useComments } from "./hooks/useComment.js";
import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";
import ActionIcons from "./ui/ActionIcons.jsx";
import useHover from "../../hooks/useHover.js";
import UserProfileOnHover from "../users/UserProfileOnHover.jsx";
import Row from "../../ui/Row.jsx";
import { useUserById } from "../users/hooks/useUserById.js";
import { RelativeDiv } from "../../ui/RelativeDiv.jsx";
import UserName from ".././users/ui/UserName.jsx";
import useWindowWidth from "../../hooks/useWindowWidth.js";
import { IoIosArrowBack } from "react-icons/io";
import { ModalContext } from "../../ui/Modal.jsx";

function ModalPost() {
  let { postId } = useParams();
  const { windowWidth } = useWindowWidth();
  const { close } = useContext(ModalContext);
  const isSmallerDevice = windowWidth <= 992;
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
    comments = {},
    error: commentsError,
    isLoading: loadingComments,
  } = useComments(postId);

  const { data: commentsData = [] } = comments;
  const { post, isLoading, error } = useModalPostById(postId);

  const {
    userById,
    isLoading: loadingUserById,
    error: userByIdError,
  } = useUserById(post?.owner?.id);

  const textareaRef = useRef(null);

  const sortedComments = commentsData?.sort(
    (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
  );

  if (isLoading || loadingUserById) return <SpinnerFullPage />;
  if (error || commentsError || userByIdError)
    return <ErrorText>{error || commentsError || userByIdError}</ErrorText>;
  const { image, likes, link, owner = {}, publishDate, tags, text } = post;
  const { firstName, lastName, id, picture: ownerPicture, title } = owner;
  return (
    <StyledModal>
      {isSmallerDevice && (
        <StyledDesc>
          <IoIosArrowBack size={26} onClick={close} />
          <p>Comments</p>
        </StyledDesc>
      )}
      <PostImage>
        <img src={image} alt="" />
      </PostImage>
      <PostBody>
        <StyledOwner>
          <div>
            <StyledRow
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
            >
              <OwnerImage
                ownerPicture={ownerPicture}
                haveBorder={true}
                id={id}
              />
              {isImageHovered && <UserProfileOnHover user={userById} />}
            </StyledRow>
            <StyledRow
              onMouseEnter={handleHeaderMouseEnter}
              onMouseLeave={handleHeaderMouseLeave}
            >
              <RelativeDiv>
                <UserName
                  firstName={firstName}
                  lastName={lastName}
                  length={40}
                  id={id}
                />
                {isSmallerDevice && <span>{post?.text}</span>}
                {isHeaderHovered && <UserProfileOnHover user={userById} />}
              </RelativeDiv>
            </StyledRow>
          </div>
          {!isSmallerDevice && (
            <div>
              <ActionButtonDots />
            </div>
          )}
        </StyledOwner>

        {loadingComments ? (
          <SpinnerMini />
        ) : (
          <StyledCommentSection
            className="scrollButtonDisappear"
            isHovered={isImageHovered || isHeaderHovered}
          >
            {sortedComments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </StyledCommentSection>
        )}

        <StyledReactionsPart>
          <ActionIcons textareaRef={textareaRef} post={post} postId={postId} />
          <Likes likes={likes} />
          <PostFormatedDate date={publishDate} isModalComment={true} />
        </StyledReactionsPart>

        <InputComment
          postId={postId}
          textareaRef={textareaRef}
          isModalComment={true}
        />
      </PostBody>
    </StyledModal>
  );
}

export default ModalPost;

const StyledModal = styled.main`
  display: grid;
  grid-template-columns: 60rem minmax(50rem, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: 50rem minmax(50rem, 1fr);
  }
  @media (max-width: 992px) {
    grid-template-columns: 60rem;
  }
  @media (max-width: 576px) {
    grid-template-columns: 100vw;
  }
`;

const StyledDesc = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: var(--border);
  padding: 1rem 0;

  & svg {
    position: absolute;
    left: 0;
    cursor: pointer;
  }

  & p {
    margin: 0 auto; /* Centers the text horizontally */
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-big);
  }
`;

const PostImage = styled.div`
  height: 90vh;
  max-height: 90vh;
  background-color: var(--color-black);
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: var(--border);
  max-width: 70rem;

  & img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

const PostBody = styled.article`
  display: grid;
  grid-template-rows: 5rem 1fr 9rem max-content;
  height: 90vh;

  @media (max-width: 992px) {
    grid-template-rows: max-content 1fr 9rem max-content;
  }
`;

const StyledOwner = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border);

  border-radius: var(--border-radius-sm);
  padding: 3rem 1.5rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  @media (max-width: 992px) {
    padding: 1rem;
  }
`;

const StyledCommentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1.5rem;
  margin-top: 2rem;
  max-height: 50rem;
  overflow: auto;
  ${(props) => (props.isHovered ? "visible" : "auto")}
`;

const StyledReactionsPart = styled.div`
  border-bottom: var(--border);
  border-top: var(--border);

  display: grid;
  grid-template-rows: 4rem 1.7rem 1rem;
  padding: 0rem 1rem;
`;

const StyledRow = styled(Row)`
  position: relative;

  & a {
    display: inline-block;
  }
  & span {
    margin-left: 1rem;
  }
`;
