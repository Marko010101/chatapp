import React from "react";
import styled from "styled-components";
import { useUserFirebase } from "../users/hooks/useUserFirebase.js";

const ChatMessage = ({ message, currentUserId }) => {
  const { text, senderId } = message;

  const isSender = senderId === currentUserId;

  return (
    <MessageContainer isSender={isSender}>
      <MessageBubble isSender={isSender}>
        <p>{text}</p>
      </MessageBubble>
    </MessageContainer>
  );
};

export default ChatMessage;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  align-items: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 8px;
  margin: 0.4rem 1rem;
  border-radius: 0.8rem;
  text-align: left;
  background-color: ${(props) => (props.isSender ? "#DCF8C6" : "#FFF")};
  border: ${(props) =>
    props.isSender ? "1px solid #34B7F1" : "1px solid #CCC"};
  color: #000;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;
