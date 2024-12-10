import styled from "styled-components";

import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import StyledModal from "../../ui/modal/StyledModal.jsx";
import StyledOverlay from "../../ui/modal/StyledOverlay.jsx";
import Row from "../../ui/Row.jsx";
import { handleCopyUrl } from "../../utils/copyUrl.js";
import { useCurrentDummyUser } from "../users/hooks/useCurrentDummyUser.js";
import { useState } from "react";
import ConfirmDelete from "../../ui/modal/ConfirmDelete.jsx";
import useDisableScroll from "../../hooks/useDisableScroll.js";
import { useDeletePost } from "./hooks/useDeletePost.js";
import { useNavigate, useParams } from "react-router-dom";

const PostActionModal = ({ onClose, post }) => {
  const { deletePost, isLoading } = useDeletePost();
  let { postId } = useParams();
  const navigate = useNavigate();
  const { href } = window.location;
  const ref = useOutsideClick(onClose);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { currentUser } = useCurrentDummyUser();
  useDisableScroll(true);

  const handleEdit = () => {
    console.log("Edit Post action triggered");
  };

  const handleGoToPost = () => {
    if (!postId) navigate(`${post.id}`);
    onClose();
  };

  const handleDeletePost = () => {
    setIsDeleteOpen(true);
  };

  const confirmDeletePost = () => {
    if (isLoading) return;

    deletePost(post.id, {
      onSuccess: () => {
        setIsDeleteOpen(false);

        onClose();
        close();
      },
      onError: (error) => {
        console.error("Error deleting post:", error.message);
      },
    });
  };

  const handleCopyLink = () => {
    handleCopyUrl(post);
    onClose();
  };

  const isCurrentUserPostOwner = currentUser?.id === post.owner?.id;

  const actions = [
    { label: "Edit Post", onClick: handleEdit },
    { label: "Go to Post", onClick: handleGoToPost },
    { label: "Copy link", onClick: handleCopyLink },
    { label: "About this Account", onClick: () => console.log("About action") },
    ...(isCurrentUserPostOwner
      ? [{ label: "Delete Post", onClick: handleDeletePost, destructive: true }]
      : []),
    { label: "Close Modal", onClick: onClose },
  ];

  return (
    <StyledOverlay>
      <StyledModal ref={ref}>
        <StyledBox>
          {actions.map((action, index) => (
            <StyledActionItem
              key={index}
              type="horizontal-center"
              onClick={action.onClick}
              destructive={action.destructive}
              aria-label={action.label}
            >
              {action.label}
            </StyledActionItem>
          ))}
          {isDeleteOpen && (
            <ConfirmDelete
              contextText="post"
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={confirmDeletePost}
              isLoading={isLoading}
            />
          )}
        </StyledBox>
      </StyledModal>
    </StyledOverlay>
  );
};

export default PostActionModal;

const StyledBox = styled.div`
  background-color: var(--color-neutral-800);
  width: 40rem;
  border-radius: 1rem;
`;

const StyledActionItem = styled(Row)`
  height: 4.8rem;
  cursor: pointer;
  border-bottom: var(--border-light);
  color: ${({ destructive }) =>
    destructive ? "var(--color-red-400)" : "var(--color-text)"};
`;
