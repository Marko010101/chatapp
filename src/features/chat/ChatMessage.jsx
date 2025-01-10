import React from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useUserById } from "../users/hooks/useUserById.js";
import defaultImage from "../../assets/default-user.jpg";
import { Link } from "react-router-dom";
import useHover from "../../hooks/useHover.js";
import Row from "../../ui/Row.jsx";

const ChatMessage = ({ message, currentUserId }) => {
  const { text, senderId } = message;
  const { userById, isLoading, error } = useUserById(senderId);
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();
  const picture = userById?.picture || defaultImage;

  const isSender = senderId === currentUserId;

  return (
    <MessageContainer
      isSender={isSender}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MessageBubble isSender={isSender} isHovered={isHovered}>
        {!isSender && (
          <Link to={`/profile/${userById?.id}`}>
            <img src={picture} alt="User image" />
          </Link>
        )}
        {isSender && isHovered && (
          <Row as="span" type="horizontal-center">
            <BsThreeDotsVertical size={18} />
          </Row>
        )}
        <p>{text}</p>
        {!isSender && isHovered && (
          <Row as="span" type="horizontal-center">
            <BsThreeDotsVertical size={18} />
          </Row>
        )}
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
  max-width: 75%;
  text-align: left;
  margin: 0.4rem 1rem 0 1rem;
  position: relative;

  & > a {
    width: 2.3rem;
    height: 2.3rem;
    flex-shrink: 0;
    align-self: flex-end;
    & img {
      border-radius: 50%;
    }
  }

  & > span {
    position: absolute;
    padding: 0.2rem;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    ${(props) => (props.isSender ? "left: -2.5rem;" : "right: -2.5rem;")}
    opacity: ${(props) => (props.isHovered ? 1 : 0)};
    cursor: pointer;

    &:hover {
      background-color: var(--color-neutral-700);
    }
    &:active {
      background-color: var(--color-neutral-800);
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
    position: relative;
  }
`;
