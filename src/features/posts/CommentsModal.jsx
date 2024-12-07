import styled, { css } from "styled-components";
import { NavLink, useParams } from "react-router-dom";

import { useComments } from "../posts/hooks/useComment.js";
import Modal from "../../ui/modal/Modal.jsx";
import ModalPost from "./ModalPost.jsx";
import StyledErrorText from "../../ui/StyledErrorText.jsx";
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
        // Show message if no comments
        <>
          {error ? (
            <StyledErrorText>Could not load comments: {error}</StyledErrorText>
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
