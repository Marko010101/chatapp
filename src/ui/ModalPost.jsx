import styled from "styled-components";
import Comment from "../features/posts/Comment.jsx";
import { useModalPostById } from "../features/posts/useModalPostById.js";

const StyledModal = styled.main`
  display: grid;
  grid-template-columns: 2fr 2.5fr;
`;

function ModalPost({ commentsData, postId }) {
  const { post, isLoading, error } = useModalPostById(postId);

  console.log(post);

  const sortedComments = commentsData?.sort(
    (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
  );

  return (
    <StyledModal>
      {sortedComments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </StyledModal>
  );
}

export default ModalPost;
