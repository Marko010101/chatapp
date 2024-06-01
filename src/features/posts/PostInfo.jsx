import React, { useState } from "react";
import styled, { css } from "styled-components";
import Comments from "./Comments.jsx";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Button from "../../ui/Button.jsx";

const StyledPostInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(3, max-content) max-content;
  row-gap: 0.7rem;
`;

const InputWrapper = styled.div`
  display: grid;
  ${(props) =>
    props.comment
      ? css`
          grid-template-columns: 1fr 5rem 2rem;
        `
      : css`
          grid-template-columns: 1fr 2rem;
        `}
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.3rem 1rem;
  border-bottom: var(--border);

  textarea {
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

function PostInfo({ likes, text, id }) {
  const [comment, setComment] = useState("");

  const isCommenting = comment.length > 0;

  const handleInputChange = (event) => {
    setComment(event.target.value);
    // Adjust the height of the textarea to fit content
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <StyledPostInfo>
      <span>{likes} likes</span>
      <p>{text}</p>
      <Comments postId={id} />
      <InputWrapper comment={isCommenting}>
        <textarea
          placeholder="Add a comment..."
          value={comment}
          onChange={handleInputChange}
          rows={1}
        />
        {isCommenting && <Button text="Post" />}
        <HiOutlineEmojiHappy />
      </InputWrapper>
    </StyledPostInfo>
  );
}

export default PostInfo;
