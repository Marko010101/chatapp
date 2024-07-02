import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Button from "./Buttons/Button.jsx";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useOutsideClick } from "../hooks/useOutsideClick.js";
import MemoizedEmoji from "./MemoizedEmoji.jsx";
import SpinnerFullPage from "./SpinnerFullPage.jsx";
import { useCurrentDummyUser } from "../features/users/useCurrentDummyUser.js";
import useCreateComment from "../features/posts/useCreateComment.js";

const StyledCommentArea = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  padding: 0.3rem 0.3rem 1rem;
  border-bottom: var(--border);

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  ${(props) =>
    props.isCommenting
      ? css`
          grid-template-columns: 1fr 5rem 2rem;
        `
      : css`
          grid-template-columns: 1fr 2rem;
        `}

  & svg {
    color: var(--color-gray-text);
    cursor: pointer;

    &:hover {
      color: var(--color-gray-active);
    }
    &:active {
      color: var(--text-stone-700);
    }
  }

  & textarea {
    background-color: transparent;
    max-height: 8.5rem;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    overflow: auto;

    &::placeholder {
      color: var(--color-gray-text);
    }

    &:focus {
      outline: none;
    }
  }
`;

function InputComment({ textareaRef, postId }) {
  const { currentUserById, isLoading, error } = useCurrentDummyUser();
  const createCommentMutation = useCreateComment();
  const [comment, setComment] = useState("");
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [comments, setComments] = useState([]); // State to manage comments

  const emojiRef = useOutsideClick(() => setEmojiPickerVisible(false), false);

  const isCommenting = comment.length > 0;

  const handleInputChange = (event) => {
    setComment(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const toggleEmojiPicker = (e) => {
    e.stopPropagation();
    setEmojiPickerVisible((prev) => !prev);
  };

  const handleEmojiSelect = (emojiObject) => {
    const emoji = emojiObject.emoji;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = comment.slice(0, start) + emoji + comment.slice(end);

    setComment(newText);
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    });
  };

  const handlePostComment = () => {
    if (comment.trim() === "") return;

    // Ensure we have the necessary IDs
    if (!currentUserById || !postId) {
      console.error("Owner ID or Post ID is missing");
      return;
    }

    const payload = {
      comment: comment,
      ownerId: currentUserById,
      postId,
    };

    console.log("Payload being sent to mutation:", payload);

    createCommentMutation.mutate(payload, {
      onSuccess: (newComment) => {
        setComment(""); // Clear the comment input on success
        setComments((prevComments) => [...prevComments, newComment]); // Add new comment to the list
      },
    });
  };

  if (isLoading) return <SpinnerFullPage />;

  return (
    <StyledCommentArea isCommenting={isCommenting}>
      <textarea
        ref={textareaRef}
        placeholder="Add a comment..."
        value={comment}
        onChange={handleInputChange}
        rows={1}
      />
      {isCommenting && <Button onClick={handlePostComment}>Post</Button>}
      <HiOutlineEmojiHappy onClick={toggleEmojiPicker} />
      {isEmojiPickerVisible && (
        <MemoizedEmoji
          emojiRef={emojiRef}
          handleEmojiSelect={handleEmojiSelect}
        />
      )}
      {/* Render the list of comments */}
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <strong>
              {comment.owner.firstName} {comment.owner.lastName}:
            </strong>{" "}
            {comment.message}
          </div>
        ))}
      </div>
    </StyledCommentArea>
  );
}

export default InputComment;
