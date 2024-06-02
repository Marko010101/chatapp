import { useState } from "react";
import styled, { css } from "styled-components";
import EmojiPicker from "emoji-picker-react";
import Button from "./Button.jsx";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useRef } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick.js";

const StyledCommentArea = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  padding: 0.3rem 0.3rem 1rem;
  border-bottom: var(--border);

  ${(props) =>
    props.comment
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

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 45rem;
  z-index: 1000;
`;

function InputComment() {
  const [comment, setComment] = useState("");
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const textareaRef = useRef(null);
  const ref = useOutsideClick(() => setEmojiPickerVisible(false));

  const isCommenting = comment.length > 0;

  const handleInputChange = (event) => {
    setComment(event.target.value);
    // Adjust the height of the textarea to fit content
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!isEmojiPickerVisible);
  };

  const handleEmojiSelect = (emojiObject) => {
    const emoji = emojiObject.emoji;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = comment.slice(0, start) + emoji + comment.slice(end);

    setComment(newText);
    // Adjust the height of the textarea to fit content after inserting the emoji
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    // Set cursor position after the inserted emoji
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    });
  };

  return (
    <StyledCommentArea comment={isCommenting}>
      <textarea
        ref={textareaRef}
        placeholder="Add a comment..."
        value={comment}
        onChange={handleInputChange}
        rows={1}
      />
      {isCommenting && <Button text="Post" />}
      <HiOutlineEmojiHappy onClick={toggleEmojiPicker} />
      {isEmojiPickerVisible && (
        <EmojiPickerContainer ref={ref}>
          <EmojiPicker
            height={320}
            width={350}
            theme="dark"
            searchLabel="Procurar emoji"
            searchDisabled={true}
            onEmojiClick={handleEmojiSelect}
            categoryDisabled={true}
          />
        </EmojiPickerContainer>
      )}
    </StyledCommentArea>
  );
}

export default InputComment;
