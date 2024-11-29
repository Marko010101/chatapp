import styled, { css } from "styled-components";
import { NavLink, useParams } from "react-router-dom";

import { useComments } from "../posts/hooks/useComment.js";
import Modal from "../../ui/modal/Modal.jsx";
import ModalPost from "./ModalPost.jsx";
import ErrorText from "../../ui/ErrorText.jsx";
import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";

function CommentsModal({ postIdComment, textareaRef }) {
  let { postId } = useParams();

  const {
    comments = {},
    error,
    isLoading: loadingComments,
  } = useComments(postIdComment);
  const { data: commentsData = [] } = comments;

  const isComments = commentsData.length;

  const handleFocusingTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  if (loadingComments) return <SpinnerMini />;

  return (
    <StyledComments>
      {!postId && isComments ? (
        <Modal>
          <Modal.Open opens="comments">
            <Text isComments={isComments}>
              <NavLink to={`/${postIdComment}`}>
                View all {isComments} comments
              </NavLink>
            </Text>
          </Modal.Open>
          <Modal.Window name="comments">
            <ModalPost />
          </Modal.Window>
        </Modal>
      ) : (
        <>
          {error ? (
            <ErrorText>Could not load comments, {error}</ErrorText>
          ) : (
            <Text onClick={handleFocusingTextarea}>No comments yet</Text>
          )}
        </>
      )}
    </StyledComments>
  );
}

export default CommentsModal;

const StyledComments = styled.div`
  width: max-content;
`;

const Text = styled.p`
  & NavLink {
    font-size: var(--font-size-small);
    color: var(--color-gray-text);

    ${(props) =>
      props.isComments &&
      css`
        cursor: pointer;

        &:active {
          color: var(--color-gray-active);
        }
      `}
  }
`;
