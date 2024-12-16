import styled, { css } from "styled-components";
import { NavLink, useParams } from "react-router-dom";

import { useComments } from "../posts/hooks/useComment.js";
import Modal from "../../ui/modal/Modal.jsx";
import ModalPost from "./ModalPost.jsx";

import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";
import ErrorDisplay from "../../ui/ErrorDisplay.jsx";

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
              <StyledNavlink to={`/${postIdComment}`}>
                View all {commentsData.length} comments
              </StyledNavlink>
            </Text>
          </Modal.Open>
          <Modal.Window name="comments">
            <ModalPost />
          </Modal.Window>
        </Modal>
      ) : (
        <>
          {error ? (
            <ErrorDisplay error={error} padding="0rem" />
          ) : (
            <Text onClick={handleFocusingTextarea}>
              {isComments
                ? `View all ${commentsData.length} comments`
                : "No comments yet"}
            </Text>
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
  width: max-content;
`;
const StyledNavlink = styled(NavLink)`
  display: block;
  height: max-content;
`;
