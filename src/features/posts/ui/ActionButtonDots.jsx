import { useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import styled from "styled-components";
import PostActionModal from "../PostActionModal.jsx";
import AccountDetailsModal from "../../users/AccountDetailsModal.jsx";

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
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);
  const toggleActionDots = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <StyledActionDots>
      <PiDotsThreeBold onClick={toggleActionDots} />
      {isOpen && (
        <PostActionModal
          onClose={toggleActionDots}
          post={post}
          setIsAccountDetailsOpen={setIsAccountDetailsOpen}
        />
      )}

      {isAccountDetailsOpen && (
        <AccountDetailsModal
          onClose={() => setIsAccountDetailsOpen(false)}
          ownerId={post.owner.id}
        />
      )}
    </StyledActionDots>
  );
}

export default ActionButtonDots;
