import styled from "styled-components";
import { fixedSizeFullName } from "../../../utils/fixedSizeFullName.js";

const StyledTitle = styled.span`
  font-weight: var(--font-weight-light);
  color: var(--color-gray-0);
  pointer-events: none;
  text-overflow: ellipsis;
  pointer-events: none;
  & p {
    display: inline;
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    pointer-events: auto;
  }
`;

function CommentText({ text, owner }) {
  const { firstName, lastName } = owner;
  return (
    <StyledTitle>
      <p>{fixedSizeFullName(firstName, lastName, (length = 50))} </p>
      {text}
    </StyledTitle>
  );
}

export default CommentText;
