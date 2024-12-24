import { useContext } from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { BiSolidCommentError } from "react-icons/bi";

import { ModalContext } from "../../../ui/modal/Modal.jsx";
import { useComments } from "../hooks/useComment.js";
import Row from "../../../ui/Row.jsx";
import SpinnerMini from "../../../ui/loaders/SpinnerMini.jsx";

function SearchedUserPost({ post }) {
  const { open } = useContext(ModalContext);
  const { comments, isLoading, error } = useComments(post?.id);
  function handleModalOpen() {
    open("ProfilePost");
  }

  if (isLoading)
    return (
      <StyledLoadingRow type="horizontal-center">
        <SpinnerMini />
      </StyledLoadingRow>
    );

  return (
    <StyledPost to={post?.id}>
      <img
        onClick={handleModalOpen}
        src={post?.image}
        alt={`Post by ${post?.user}`}
      />
      <StyledParagraph type="horizontal-center" as="p" gap="3rem">
        <span>
          <FaHeart /> {post?.likes}
        </span>
        <span>
          {error ? (
            <BiSolidCommentError />
          ) : (
            <>
              <FaComment /> {comments?.data?.length}
            </>
          )}
        </span>
      </StyledParagraph>
    </StyledPost>
  );
}

export default SearchedUserPost;

const StyledPost = styled(NavLink)`
  position: relative;
  display: flex;
  width: 100%;

  & img {
    width: 100%;
    height: 25rem;
    object-fit: cover;
    transition: filter 0.2s ease;
  }

  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-medium);
    gap: 0.5rem;
  }

  &:hover img {
    filter: brightness(0.6);
  }

  &:hover p {
    opacity: 1;
  }
`;

const StyledParagraph = styled(Row)`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: var(--font-size-big);
  opacity: 0;
  transition: opacity 0.2s ease;
  width: 100%;
`;

const StyledLoadingRow = styled(Row)`
  height: 25rem;
`;
