import styled, { css } from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  color: var(--text-blue-500);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;
  min-width: 7rem;

  ${(props) =>
    !props.isCommenting &&
    props.isModalComment &&
    css`
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
