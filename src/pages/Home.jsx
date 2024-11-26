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
import SpinnerGrayMini from "../ui/loaders/SpinnerGrayMini.jsx";
import { useInView } from "react-intersection-observer";
import Footer from "../ui/Footer.jsx";
import useWindowWidth from "../hooks/useWindowWidth.js";

function Home() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usePosts();
  let { postId } = useParams();
  const { open } = useContext(ModalContext);
  const { ref, inView } = useInView();
  const { windowWidth } = useWindowWidth();

  useEffect(() => {
    if (postId) {
      open("modalPost");
    }
  }, [postId, open]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading || !data) return <SpinnerFullPage />;
  if (error) return (<ErrorText>{error.message}</ErrorText>)();
  if (!data || data.pages.length === 0) return <Empty resourceName="posts" />;

  const content = data.pages.map((page) =>
    page?.data?.map((post, index) => {
      if (page?.data?.length == index + 1) {
        return <Post key={post?.id} post={post} innerRef={ref} />;
      } else {
        return <Post key={post?.id} post={post} />;
      }
    })
  );

  return (
    <>
      {postId && (
        <div>
          <Modal.Window name="modalPost">
            <ModalPost />
          </Modal.Window>
        </div>
      )}

      <StyledPosts>
        <div>
          {content}
          <CenteredSpinnerWrapper>
            {isFetchingNextPage && <SpinnerGrayMini />}
          </CenteredSpinnerWrapper>
        </div>
        {windowWidth >= 992 && (
          <SuggestedFriends>
            <UserSugestions />
          </SuggestedFriends>
        )}
        <Footer />
      </StyledPosts>
    </>
  );
}

export default Home;

const StyledPosts = styled.main`
  margin-top: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: max-content 23rem;

  @media (max-width: 1200px) {
    gap: 4rem;
  }
  @media (max-width: 992px) {
    grid-template-columns: max-content;
  }
  @media (max-width: 768px) {
    padding-left: 8rem;
  }
`;

const SuggestedFriends = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 19rem;
  width: 29rem;

  @media (max-width: 1200px) {
    margin-left: 0rem;
  }
`;

const CenteredSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
