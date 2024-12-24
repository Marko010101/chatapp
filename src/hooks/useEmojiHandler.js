import { useState, useRef } from "react";
import { useOutsideClick } from "./useOutsideClick.js";

const useEmojiHandler = (initialText = "") => {
  const [text, setText] = useState(initialText);
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const textareaRef = useRef();
  const emojiRef = useOutsideClick(() => setEmojiPickerVisible(false), false);

  const toggleEmojiPicker = (e) => {
    e.stopPropagation();
    setEmojiPickerVisible((prev) => !prev);
  };

  const handleEmojiSelect = (emojiObject) => {
    const emoji = emojiObject.emoji;
    const textarea = textareaRef.current;

    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = text.slice(0, start) + emoji + text.slice(end);

      setText(newText);
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
      });
    }
  };

  return {
    text,
    setText,
    isEmojiPickerVisible,
    setEmojiPickerVisible,
    toggleEmojiPicker,
    handleEmojiSelect,
    textareaRef,
    emojiRef,
  };
};

export default useEmojiHandler;
