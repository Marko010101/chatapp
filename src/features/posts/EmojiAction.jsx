import styled from "styled-components";

const StyledEmoji = styled.div`
  color: var(--color-gray-0);
  font-size: 2.5rem;
  cursor: pointer;

  &:hover {
    color: var(--color-neutral-400);
  }
  &:active {
    color: var(--color-neutral-600);
  }
`;

function EmojiAction({ action, emoji }) {
  return <StyledEmoji onClick={action}>{emoji}</StyledEmoji>;
}

export default EmojiAction;
