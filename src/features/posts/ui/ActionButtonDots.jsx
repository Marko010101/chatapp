import { useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import styled from "styled-components";
import PostActionModal from "../PostActionModal.jsx";

const StyledActionDots = styled.span`
  width: 2.5rem;
  height: 2.5rem;

  & > svg {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  & > svg:hover {
    fill: var(--color-neutral-400);
  }
  & > svg:active {
    fill: var(--color-neutral-500);
  }
`;

function ActionButtonDots({ post }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleActionDots = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <StyledActionDots>
      <PiDotsThreeBold onClick={toggleActionDots} />
      {isOpen && <PostActionModal onClose={toggleActionDots} post={post} />}
    </StyledActionDots>
  );
}

export default ActionButtonDots;
