import CommentSectionModal from "./CommentSectionModal.jsx";
import { useUserById } from "../../users/hooks/useUserById.js";
import SpinnerMini from "../../../ui/loaders/SpinnerMini.jsx";
import StyledErrorText from "../../../ui/StyledErrorText.jsx";
import { useDeleteComment } from "../hooks/useDeleteComment.js";

function Comment({ comment }) {
  const { message, owner, publishDate, id, post: postId } = comment;
  const { userById = {}, isLoading, error } = useUserById(owner?.id);
  const { deleteComment } = useDeleteComment(postId);

  const handleDeleteComment = () => {
    deleteComment(id);
  };

  const {
    firstName,
    lastName,
    picture: ownerPicture,
  } = userById; /* This have more parts */

  if (!owner)
    return (
      <StyledErrorText>
        Comment could not load due to an API error.
      </StyledErrorText>
    );
  if (isLoading) return <SpinnerMini />;
  if (error) return <StyledErrorText>{error}</StyledErrorText>;

  return (
    <CommentSectionModal
      ownerPicture={ownerPicture}
      firstName={firstName}
      lastName={lastName}
      text={message}
      date={publishDate}
      onDeleteComment={handleDeleteComment}
      owner={userById}
    />
  );
}

export default Comment;
