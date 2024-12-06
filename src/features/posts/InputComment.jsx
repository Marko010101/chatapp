import { useState } from "react";
import styled, { css } from "styled-components";
import { HiOutlineEmojiHappy } from "react-icons/hi";

import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import MemoizedEmoji from "../../ui/MemoizedEmoji.jsx";
import SpinnerFullPage from "../../ui/loaders/SpinnerFullPage.jsx";
import { useCurrentDummyUser } from "../users/hooks/useCurrentDummyUser.js";
import useCreateComment from "./hooks/useCreateComment.js";
import StyledErrorText from "../../ui/StyledErrorText.jsx";
import StyledButton from "../../ui/Buttons/StyledButton.jsx";

function InputComment({ textareaRef, postId, isModalComment }) {
  const { currentUser, isLoading, error } = useCurrentDummyUser();
  const { mutate, isLoading: isLoadingComment } = useCreateComment();
  const [comment, setComment] = useState("");
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const emojiRef = useOutsideClick(() => setEmojiPickerVisible(false), false);

  let isCommenting = comment.length > 0;

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

    if (!currentUser || !postId) {
      return;
    }

    const payload = {
      comment: comment,
      ownerId: currentUser,
      postId,
    };

    mutate(payload, {
      onSuccess: (newComment) => {
        setComment("");
      },
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handlePostComment();
    }
  };

  if (isLoading) return <SpinnerFullPage />;
  if (error) return <StyledErrorText />;

  return (
    <StyledCommentArea
      isModalComment={isModalComment}
      isCommenting={isCommenting}
    >
      <textarea
        disabled={isLoadingComment}
        ref={textareaRef}
        placeholder="Add a comment..."
        value={comment}
        onChange={handleInputChange}
        rows={1}
        onKeyDown={handleKeyPress}
        className="scrollButtonDisappear"
      />
      {isCommenting ? (
        <StyledButton onClick={handlePostComment}>Post</StyledButton>
      ) : (
        isModalComment && (
          <StyledButton
            onClick={handlePostComment}
            isCommenting={isCommenting}
            isModalComment={isModalComment}
          >
            Post
          </StyledButton>
        )
      )}
      <HiOutlineEmojiHappy onClick={toggleEmojiPicker} />
      {isEmojiPickerVisible && (
        <MemoizedEmoji
          emojiRef={emojiRef}
          handleEmojiSelect={handleEmojiSelect}
          isModalEmojiPicker={isModalComment}
        />
      )}
    </StyledCommentArea>
  );
}

export default InputComment;

const StyledCommentArea = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  padding: 0.3rem 0.3rem 1rem;
  border-bottom: var(--border);
  min-height: 5rem;
  margin-bottom: 1.6rem;

  ${(props) =>
    !props.isModalComment && props.isCommenting
      ? css`
          grid-template-columns: 1fr 5rem 2rem;
        `
      : css`
          grid-template-columns: 1fr 2rem;
        `}

  ${(props) =>
    props.isModalComment &&
    css`
      grid-template-columns: 4rem 1fr 5rem;
    `}

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  color: var(--color-gray-text);
  cursor: pointer;

  &:hover {
    color: var(--color-gray-active);
  }
  &:active {
    color: var(--text-stone-700);
  }

  & svg {
    ${(props) =>
      props.isModalComment &&
      css`
        color: var(--color-gray-0);
        font-size: 2.5rem;
        grid-column: 1/2;
        grid-row: 1/-1;
      `}
  }

  & textarea {
    background-color: transparent;
    max-height: 8.5rem;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    overflow: auto;
    color: var(--color-text);
    font-size: var(--font-size-small);

    &::placeholder {
      color: var(--color-gray-text);
    }

    &:focus {
      outline: none;
    }
  }
`;
