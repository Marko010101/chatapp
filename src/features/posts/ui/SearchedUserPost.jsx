import { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

import { ModalContext } from "../../../ui/modal/Modal.jsx";
import { useComments } from "../hooks/useComment.js";

function SearchedUserPost({ post }) {
  const { open } = useContext(ModalContext);
  const { isLoading, comments } = useComments(post?.id);

  function handleModalOpen() {
    open("ProfilePost");
  }

  if (isLoading) return null;

  return (
    <StyledPost to={post?.id}>
      <img
        onClick={handleModalOpen}
        src={post?.image}
        alt={`Post by ${post?.user}`}
      />
      <p>
        <span>
          <FaHeart /> {post?.likes}
        </span>
        <span>
          <FaComment /> {comments?.data?.length}
        </span>
      </p>
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

  & p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: var(--font-size-big);
    opacity: 0;
    transition: opacity 0.2s ease;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }

  & span {
    display: flex;
    align-items: center;
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
