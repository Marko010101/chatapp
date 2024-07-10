import CommentSectionModal from "./CommentSectionModal.jsx";
import { useUserById } from "./useUserById.js";
import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";
import ErrorText from "../../ui/ErrorText.jsx";

function Comment({ comment }) {
  const { message, owner, publishDate } = comment;
  const { commentOwner = {}, isLoading, error } = useUserById(owner?.id);
  const {
    firstName,
    lastName,
    picture: ownerPicture,
  } = commentOwner; /* This have more parts */

  console.log(isLoading);
  console.log(owner);

  if (!owner)
    return <ErrorText>Comment could not load due to an API error.</ErrorText>;
  if (isLoading) return <SpinnerMini />;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <CommentSectionModal
      ownerPicture={ownerPicture}
      firstName={firstName}
      lastName={lastName}
      text={message}
    />
  );
}

export default Comment;
