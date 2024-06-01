import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  color: var(--color-brand-500);
  font-weight: var(--font-weight-semibold);
  border: none;
  cursor: pointer; /* Add a pointer cursor for better UX */

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
`;

function Button({ text }) {
  return <StyledButton>{text}</StyledButton>;
}

export default Button;
