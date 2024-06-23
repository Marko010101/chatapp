import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: max-content;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 0.6rem 1.6rem;
  border-style: none;
  background-color: rgba(51, 51, 51, 0.95);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-big);
  font-weight: var(--font-weight-semibold);

  &:hover {
    background-color: var(--color-neutral-800);
  }
  &:active,
  :visited {
    color: var(--color-neutral-400);
    background-color: var(--color-neutral-900);
  }
`;

// ButtonNeutral component to accept and forward all props to StyledButton
export default function ButtonNeutral({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
