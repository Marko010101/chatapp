import styled, { css } from "styled-components";
import Comments from "./Comments.jsx";
import InputComment from "../../ui/InputComment.jsx";
import { titleFix } from "../../utils/helpers.js";
import { useRef } from "react";

const StyledPostInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(3, max-content) max-content;
  row-gap: 0.7rem;
`;

function PostInfo({ likes, text, id }) {
  const textareaRef = useRef(null);
  
  return (
    <StyledPostInfo>
      <span>{likes} likes</span>
      <p>{titleFix(text)}</p>
      <Comments postId={id} textareaRef={textareaRef} />
      <InputComment textareaRef={textareaRef} />
    </StyledPostInfo>
  );
}

export default PostInfo;
