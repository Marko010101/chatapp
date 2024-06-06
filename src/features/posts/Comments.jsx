import styled, { css } from "styled-components";
import { useComments } from "./useComment.js";
import Modal from "../../ui/Modal.jsx";
import ModalPost from "../../ui/ModalPost.jsx";
import ErrorText from "../../ui/ErrorText.jsx";

const StyledComments = styled.div``;

const Text = styled.p`
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
`;

function Comments({ postId, textareaRef }) {
  const { comments = {}, error } = useComments(postId);
  const { data: commentsData = [] } = comments;

  const isComments = commentsData.length;

  const handleFocusingTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <StyledComments>
      {isComments ? (
        <Modal>
          <Modal.Open opens="comments">
            <Text isComments={isComments}>View all {isComments} comments</Text>
          </Modal.Open>
          <Modal.Window name="comments">
            <ModalPost commentsData={commentsData} postId={postId} />
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

export default Comments;
