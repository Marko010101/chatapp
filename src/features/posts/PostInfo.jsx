import styled, { css } from "styled-components";
import Comments from "./Comments.jsx";
import InputComment from "../../ui/InputComment.jsx";
import { titleFix } from "../../utils/helpers.js";

const StyledPostInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(3, max-content) max-content;
  row-gap: 0.7rem;
`;

function PostInfo({ likes, text, id }) {
  return (
    <StyledPostInfo>
      <span>{likes} likes</span>
      <p>{titleFix(text)}</p>
      <Comments postId={id} />
      <InputComment />
    </StyledPostInfo>
  );
}

export default PostInfo;
