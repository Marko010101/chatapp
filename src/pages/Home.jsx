import styled from "styled-components";
import SpinnerFullPage from "../ui/loaders/SpinnerFullPage.jsx";
import Post from "../features/posts/Post.jsx";
import Empty from "../ui/Empty.jsx";
import { useParams } from "react-router-dom";
import ModalPost from "../features/posts/ModalPost.jsx";
import Modal, { ModalContext } from "../ui/Modal.jsx";
import { useEffect } from "react";
import { useContext } from "react";
import ErrorText from "../ui/ErrorText.jsx";
import { usePosts } from "../features/posts/hooks/usePosts.js";

const StyledPosts = styled.main`
  width: 46rem;
`;

function Home() {
  const { isLoading, posts, error } = usePosts();
  let { postId } = useParams();
  const { open } = useContext(ModalContext);
  useEffect(() => {
    if (postId) {
      open("modalPost");
    }
  }, [postId, open]);

  if (isLoading) return <SpinnerFullPage />;
  if (!posts.length) return <Empty resourceName="posts" />;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <StyledPosts>
      {postId && (
        <div>
          <Modal.Window name="modalPost">
            <ModalPost />
          </Modal.Window>
        </div>
      )}
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </StyledPosts>
  );
}

export default Home;
