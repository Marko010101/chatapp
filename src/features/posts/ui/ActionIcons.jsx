import { FaRegComment } from "react-icons/fa";
import { IoIosSend, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import toast from "react-hot-toast";
import styled, { keyframes } from "styled-components";

import EmojiAction from "./EmojiAction.jsx";
import { useUpdatePost } from "../hooks/useUpdatePost.js";
import { useLike } from "../../../context/LikesContext.jsx";
import ErrorText from "../../../ui/ErrorText.jsx";
import SpinnerMini from "../../../ui/loaders/SpinnerMini.jsx";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledIcons = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 0.7rem;

  & div {
    display: flex;
    align-items: center;
    gap: 1.8rem;
  }

  & span:first-child svg {
    margin-left: -0.25rem;
  }

  & svg {
    cursor: pointer;

    &:hover {
      color: var(--color-neutral-400);
    }
    &:active {
      color: var(--color-neutral-600);
    }
  }
`;

const LikedHeart = styled(IoMdHeart)`
  color: var(--color-red-600);
  animation: ${pulse} 0.25s ease-in-out;

  &:hover {
    color: var(--color-red-600) !important;
  }

  &:active {
    color: var(--color-red-600) !important;
  }
`;

function ActionIcons({ textareaRef, postId, post }) {
  const { mutate, isLoading, error } = useUpdatePost();
  const { likedPosts, toggleLike } = useLike();

  const handleToggleLike = () => {
    if (isLoading) return;
    const updatedLikes = likedPosts[post.id] ? post.likes - 1 : post.likes + 1;
    const updatedPostData = { ...post, likes: updatedLikes };

    toggleLike(post.id);

    mutate({ id: post.id, updatedPostData });
  };

  const handleFocusTextarea = () => {
    textareaRef.current.focus();
  };

  const handleCopyUrl = () => {
    const urlToCopy = postId
      ? window.location.href
      : `${window.location.href}${post.id}`;
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        toast.success("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  if (error) return <ErrorText>{error.message}</ErrorText>;

  return (
    <StyledIcons>
      <div>
        <span>
          <EmojiAction
            action={handleToggleLike}
            emoji={
              likedPosts[post.id] ? (
                <LikedHeart size={28} />
              ) : (
                <IoMdHeartEmpty size={28} />
              )
            }
          />
        </span>
        <span>
          <EmojiAction
            action={handleFocusTextarea}
            emoji={<FaRegComment size={24} />}
          />
        </span>
      </div>
      <div>
        <span>
          <EmojiAction action={handleCopyUrl} emoji={<IoIosSend size={24} />} />
        </span>
      </div>
    </StyledIcons>
  );
}

export default ActionIcons;
