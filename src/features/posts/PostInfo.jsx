import styled from "styled-components";
import Comments from "./Comments.jsx";

const StyledPostInfo = styled.div``;

function PostInfo({ likes, text, id }) {
  return (
    <StyledPostInfo>
      <span>{likes} likes</span>
      <p>{text}</p>
      <Comments postId={id} />
    </StyledPostInfo>
  );
}

export default PostInfo;
