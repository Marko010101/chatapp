import CommentSectionModal from "./CommentSectionModal.jsx";
import { useUserById } from "../../users/hooks/useUserById.js";
import SpinnerMini from "../../../ui/loaders/SpinnerMini.jsx";
import { useDeleteComment } from "../hooks/useDeleteComment.js";
import ErrorDisplay from "../../../ui/ErrorDisplay.jsx";

function Comment({ comment }) {
  const { message, owner, publishDate, id, post: postId } = comment;
  const { userById = {}, isLoading, error } = useUserById(owner?.id);
  const {
    deleteComment,
    isLoading: isDeletingComment,
    error: ErrorWhileDeleting,
  } = useDeleteComment(postId);

  const handleDeleteComment = () => {
    deleteComment(id);
  };

  const { firstName, lastName, picture: ownerPicture } = userById;

  if (isLoading) return <SpinnerMini />;
  if (error) return <ErrorDisplay error={error || ErrorWhileDeleting} />;

  return (
    <CommentSectionModal
      ownerPicture={ownerPicture}
      firstName={firstName}
      lastName={lastName}
      text={message}
      date={publishDate}
      onDeleteComment={handleDeleteComment}
      owner={userById}
      isDeletingComment={isDeletingComment}
    />
  );
}

export default Comment;
