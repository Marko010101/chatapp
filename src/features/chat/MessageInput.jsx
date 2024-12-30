import styled from "styled-components";

import { HiOutlineEmojiHappy } from "react-icons/hi";
import { sendMessage } from "../../services/apiMessages.js";
import Input from "../../ui/Input.jsx";
import MemoizedEmoji from "../../ui/MemoizedEmoji.jsx";
import useEmojiHandler from "../../hooks/useEmojiHandler.js";

const MessageInput = ({ userId, chatId, chatContainerRef }) => {
  const {
    text,
    setText,
    isEmojiPickerVisible,
    toggleEmojiPicker,
    handleEmojiSelect,
    textareaRef,
    emojiRef,
  } = useEmojiHandler("");

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "4rem";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  const handleSendMessage = () => {
    if (text.trim()) {
      sendMessage(text, userId, chatId);
      setText("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "4rem";
      }

      if (chatContainerRef?.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <StyledBox>
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
          as="textarea"
          ref={textareaRef}
          rows={1}
          value={text}
          className="scrollButtonDisappear"
          onChange={(e) => setText(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </StyledMessageInput>
    </StyledBox>
  );
};

export default MessageInput;

const StyledBox = styled.div`
  position: fixed;
  left: calc(var(--sidebar-width-shrunk) + var(--sidebar-width-messages));
  background-color: var(--color-black);
  bottom: 0;
  width: calc(
    100% - (var(--sidebar-width-shrunk) + var(--sidebar-width-messages))
  );
  padding: 3.7rem 0;
`;

const StyledMessageInput = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr 7rem;
  align-items: center;
  border-radius: 5rem;
  padding: 0.4rem 1rem;
  border: var(--border);
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background-color: var(--color-black);

  & textarea {
    background-color: transparent;
    height: 4rem;
    max-height: 10rem;
    border: none;
    outline: none;
    resize: none;
    overflow-y: auto;

    &::placeholder {
      color: var(--color-gray-text);
    }

    &:focus {
      outline: none;
    }
  }

  & > svg {
    justify-self: center;
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
    padding: 0.7rem;
  }
`;
