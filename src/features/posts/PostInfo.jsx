import styled from "styled-components";
import Comments from "./CommentsModal.jsx";
import InputComment from "../../ui/InputComment.jsx";
import { useRef } from "react";
import Likes from "./Likes.jsx";
import Title from "./Title.jsx";

const StyledPostInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(3, max-content) max-content;
  row-gap: 0.7rem;
`;

function PostInfo({ likes, text = "", id }) {
  const textareaRef = useRef(null);

  return (
    <StyledPostInfo>
      <Likes likes={likes} />
      <Title text={text} />
      <Comments postIdComment={id} textareaRef={textareaRef} />
      <InputComment postId={id} textareaRef={textareaRef} />
    </StyledPostInfo>
  );
}

export default PostInfo;
