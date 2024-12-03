import styled from "styled-components";
import SpinnerFullPage from "../ui/loaders/SpinnerFullPage.jsx";
import Post from "../features/posts/Post.jsx";
import Empty from "../ui/Empty.jsx";
import { useParams } from "react-router-dom";
import ModalPost from "../features/posts/ModalPost.jsx";
import Modal, { ModalContext } from "../ui/modal/Modal.jsx";
import { useEffect } from "react";
import { useContext } from "react";
import StyledErrorText from "../ui/StyledErrorText.jsx";
import { usePosts } from "../features/posts/hooks/usePosts.js";
import UserSugestions from "../features/users/UserSugestions.jsx";
import SpinnerGrayMini from "../ui/loaders/SpinnerGrayMini.jsx";
import { useInView } from "react-intersection-observer";
import Footer from "../ui/Footer.jsx";
import useWindowWidth from "../hooks/useWindowWidth.js";
import Row from "../ui/Row.jsx";

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
  if (error) return (<StyledErrorText>{error.message}</StyledErrorText>)();
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
          <Row type="horizontal-center" margin="2rem 0 0 0">
            {isFetchingNextPage && <SpinnerGrayMini />}
          </Row>
        </div>
        {windowWidth >= 992 && (
          <SuggestedFriends type="vertical" margin="0 0 0 19rem">
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

const SuggestedFriends = styled(Row)`
  width: 29rem;

  @media (max-width: 1600px) {
    margin-left: 10rem;
  }
  @media (max-width: 1200px) {
    margin-left: 0rem;
  }
`;
