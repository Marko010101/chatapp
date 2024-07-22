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
import UserSugestions from "../features/users/UserSugestions.jsx";

const StyledPosts = styled.main`
  margin-top: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: max-content 23rem;
`;

const SuggestedFriends = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 19rem;
  width: 29rem;
`;

function Home() {
  // UPDATE FUNCTIONALITY FOR USER
  // const { mutate: updateUser } = useUpdateUser();

  // const picture =
  //   "https://media.gettyimages.com/id/170462856/photo/dog-working-comfortably-from-home.jpg?s=612x612&w=0&k=20&c=bkWU83XcvVdxQBvQmoqVNkM-zLZsGy4BZPWWQQqzMok=";

  // const handleUpdate = () => {
  //   if (currentUserById) {
  //     updateUser({ id: currentUserById.id, changes: { picture } });
  //   } else {
  //     console.error("User ID is not available");
  //   }
  // };

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

      <div>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
      <SuggestedFriends>
        <UserSugestions />
      </SuggestedFriends>
    </StyledPosts>
  );
}

export default Home;
