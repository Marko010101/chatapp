import styled from "styled-components";

const StyledErrorText = styled.p`
  color: var(--color-red-400);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-tiny);
  font-style: italic;
`;

function ErrorText({ children }) {
  return <StyledErrorText>{children}</StyledErrorText>;
}

export default ErrorText;
