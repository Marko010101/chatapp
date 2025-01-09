import React from "react";
import styled from "styled-components";

import { useUserById } from "../users/hooks/useUserById.js";
import defaultImage from "../../assets/default-user.jpg";
import { Link } from "react-router-dom";

const ChatMessage = ({ message, currentUserId }) => {
  const { text, senderId } = message;
  const { userById, isLoading, error } = useUserById(senderId);
  const picture = userById?.picture || defaultImage;

  const isSender = senderId === currentUserId;

  return (
    <MessageContainer isSender={isSender}>
      <MessageBubble isSender={isSender}>
        {!isSender && (
          <Link to={`/profile/${userById?.id}`}>
            <img src={picture} alt="User image" />
          </Link>
        )}
        <p>{text}</p>
      </MessageBubble>
    </MessageContainer>
  );
};

export default ChatMessage;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10rem;
  width: 100%;
  align-items: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 70%;
  text-align: left;
  margin: 0.4rem 1rem 0 1rem;

  & > a {
    width: 2.3rem;
    height: 2.3rem;
    flex-shrink: 0;
    align-self: flex-end;
    & img {
      border-radius: 50%;
    }
  }

  & > p {
    margin-bottom: 0.7rem;
    padding: 1rem 1.5rem;
    background-color: ${(props) =>
      props.isSender ? "var(--text-blue-500)" : "var(--color-neutral-800)"};
    align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};

    clip-path: ${(props) =>
      props.isSender
        ? "inset(0 round 4rem 4rem 0 4rem)"
        : "inset(0 round 4rem 4rem 4rem 0)"};
  }
`;
