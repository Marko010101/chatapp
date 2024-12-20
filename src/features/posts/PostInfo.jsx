import styled from "styled-components";
import Comments from "./CommentsModal.jsx";
import InputComment from "./InputComment.jsx";
import { useRef } from "react";
import Likes from "./ui/Likes.jsx";
import CommentText from "./ui/CommentText.jsx";
import ActionIcons from "./ui/ActionIcons.jsx";

const StyledPostInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(3, max-content) max-content;
  row-gap: 0.3rem;
`;

function PostInfo({ post }) {
  const { id, likes, text, owner } = post;

  const textareaRef = useRef(null);

  return (
    <StyledPostInfo>
      <ActionIcons textareaRef={textareaRef} post={post} />
      <Likes likes={likes} />
      <CommentText text={text} owner={owner} />
      <Comments postIdComment={id} textareaRef={textareaRef} />
      <InputComment textareaRef={textareaRef} postId={id} />
    </StyledPostInfo>
  );
}

export default PostInfo;
