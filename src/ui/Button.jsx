import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  color: var(--text-blue-500);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;

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
