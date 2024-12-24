import { useState } from "react";
import styled from "styled-components";

import { HiOutlineEmojiHappy } from "react-icons/hi";
import { sendMessage } from "../../services/apiMessages.js";
import Input from "../../ui/Input.jsx";
import MemoizedEmoji from "../../ui/MemoizedEmoji.jsx";
import useEmojiHandler from "../../hooks/useEmojiHandler.js";
import Row from "../../ui/Row.jsx";

const MessageInput = ({ userId, chatId }) => {
  const {
    text,
    setText,
    isEmojiPickerVisible,
    toggleEmojiPicker,
    handleEmojiSelect,
    textareaRef,
    emojiRef,
  } = useEmojiHandler("");

  const handleSendMessage = () => {
    if (text.trim()) {
      sendMessage(text, userId, chatId);
      setText("");
    }
  };

  return (
    <StyledMessageInput type="horizontal">
      <HiOutlineEmojiHappy size={24} onClick={toggleEmojiPicker} />
      {isEmojiPickerVisible && (
        <MemoizedEmoji
          emojiRef={emojiRef}
          handleEmojiSelect={handleEmojiSelect}
          isModalEmojiPicker={false}
        />
      )}
      <Input
        type="text"
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </StyledMessageInput>
  );
};

export default MessageInput;

const StyledMessageInput = styled(Row)`
  width: 100%;
  border-radius: 5rem;
  padding: 0.8rem 1.5rem;
  border: var(--border);

  & input {
    border: none;
    background-color: inherit;
    width: 95%;
  }

  & > svg {
    cursor: pointer;
    &:hover {
      color: var(--color-neutral-300);
    }
    &:active {
      color: var(--color-neutral-400);
    }
  }

  & > button {
    background-color: var(--text-blue-600);
    border: none;
    border-radius: 5rem;
    padding: 1rem;
  }
`;
