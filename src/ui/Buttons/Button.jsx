import styled, { css } from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  color: var(--text-blue-500);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;

  ${(props) =>
    !props.isTyping &&
    css`
      pointer-events: none;
      color: var(--text-cyan-800);
    `}

  &:focus {
    outline: none;
  }

  &:hover {
    color: var(--color-gray-200);
  }

  &:active {
    color: var(--color-gray-text);
  }
  &:visited {
    outline: none;
  }

  /* Additional styles for the disabled state */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
