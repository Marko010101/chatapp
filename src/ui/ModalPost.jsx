import styled from "styled-components";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { useRef } from "react";

import Comment from "../features/posts/Comment.jsx";
import { useModalPostById } from "../features/posts/useModalPostById.js";
import SpinnerFullPage from "./loaders/SpinnerFullPage.jsx";
import OwnerImage from "../features/posts/OwnerImage.jsx";
import Heading from "./Heading.jsx";
import ActionButtonDots from "./ActionButtonDots.jsx";
import { fixedSizeFullName } from "../utils/helpers.js";
import CommentSectionModal from "../features/posts/CommentSectionModal.jsx";
import InputComment from "./InputComment.jsx";
import Likes from "../features/posts/Likes.jsx";
import PostFormatedDate from "../features/posts/PostFormatedDate.jsx";
import EmojiAction from "../features/posts/EmojiAction.jsx";
import ErrorText from "./ErrorText.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useComments } from "../features/posts/useComment.js";
import SpinnerMini from "./loaders/SpinnerMini.jsx";

const StyledModal = styled.main`
  display: grid;
  grid-template-columns: 60rem minmax(50rem, 1fr);
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
`;

const PostBody = styled.article`
  display: grid;
  grid-template-rows: 5rem 1fr 10rem max-content;
  height: 90vh;
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
`;

const StyledCommentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.5rem;
  margin-top: 2rem;
  max-height: 50rem;
  overflow: auto;
`;

const StyledReactionsPart = styled.div`
  border-bottom: var(--border);
  border-top: var(--border);

  display: grid;
  grid-template-rows: 4rem 1.7rem 1rem;
  padding: 1rem;
`;

const Icons = styled.section`
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  & svg {
    cursor: pointer;

    &:hover {
      color: var(--color-neutral-400);
    }
    &:active {
      color: var(--color-neutral-600);
    }
  }
`;

function ModalPost() {
  let { postId } = useParams();

  const {
    comments = {},
    error: commentsError,
    isLoading: loadingComments,
  } = useComments(postId);
  const { data: commentsData = [] } = comments;

  console.log(loadingComments);

  const { post, isLoading, error } = useModalPostById(postId);

  const { image, likes, link, owner = {}, publishDate, tags, text } = post;
  const { firstName, lastName, id, picture: ownerPicture, title } = owner;
  const textareaRef = useRef(null);

  const sortedComments = commentsData?.sort(
    (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
  );

  if (isLoading) return <SpinnerFullPage />;
  if (error || commentsError)
    return <ErrorText>{error || commentsError}</ErrorText>;

  const handleFocusTextarea = () => {
    textareaRef.current.focus();
  };

  return (
    <StyledModal>
      <PostImage>
        <img src={image} alt="" />
      </PostImage>
      <PostBody>
        <StyledOwner>
          <div>
            <OwnerImage ownerPicture={ownerPicture} />
            <Heading as="h5">
              {fixedSizeFullName(firstName, lastName, 40)}
            </Heading>
          </div>
          <div>
            <ActionButtonDots />
          </div>
        </StyledOwner>

        {loadingComments ? (
          <SpinnerMini />
        ) : (
          <StyledCommentSection className="scrollButtonDisappear">
            <CommentSectionModal
              ownerPicture={ownerPicture}
              firstName={firstName}
              lastName={lastName}
              text={text}
            />
            {sortedComments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </StyledCommentSection>
        )}

        <StyledReactionsPart>
          <Icons>
            <div>
              <span>
                <EmojiAction emoji={<IoMdHeartEmpty size={28} />} />
              </span>
              <span>
                <EmojiAction
                  action={handleFocusTextarea}
                  emoji={<FaRegComment size={24} />}
                />
              </span>
            </div>
            <div>
              <span>
                <EmojiAction emoji={<IoIosSend size={24} />} />
              </span>
            </div>
          </Icons>
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
