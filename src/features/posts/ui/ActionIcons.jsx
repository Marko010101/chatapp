import { FaRegComment } from "react-icons/fa";
import { IoIosSend, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import toast from "react-hot-toast";
import styled, { keyframes } from "styled-components";

import EmojiAction from "./EmojiAction.jsx";
import { useUpdatePost } from "../hooks/useUpdatePost.js";
import { useLike } from "../../../context/LikesContext.jsx";
import Row from "../../../ui/Row.jsx";
import { handleCopyUrl } from "../../../utils/copyUrl.js";
import ErrorDisplay from "../../../ui/ErrorDisplay.jsx";

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

  if (error) return <ErrorDisplay error={error} />;

  return (
    <StyledIcons type="horizontal" margin="0.7rem 0 0 0">
      <div>
        <span>
          <EmojiAction
            action={handleToggleLike}
            emoji={
              likedPosts[post?.id] ? (
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
          <EmojiAction
            action={() => handleCopyUrl(post)}
            emoji={<IoIosSend size={24} />}
          />
        </span>
      </div>
    </StyledIcons>
  );
}

export default ActionIcons;

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

const StyledIcons = styled(Row)`
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
