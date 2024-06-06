import React from "react";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 45rem;
  z-index: 1000;
`;

const MemoizedEmoji = React.memo(function EmojiMemo({
  emojiRef,
  handleEmojiSelect,
}) {
  return (
    <EmojiPickerContainer ref={emojiRef}>
      <EmojiPicker
        height="32rem"
        width="35rem"
        theme="dark"
        searchLabel="Procurar emoji"
        searchDisabled={true}
        onEmojiClick={handleEmojiSelect}
        categoryDisabled={true}
      />
    </EmojiPickerContainer>
  );
});

export default MemoizedEmoji;
