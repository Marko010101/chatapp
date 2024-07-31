import styled from "styled-components";
import { titleFix } from "../../../utils/helpers.js";

const StyledTitle = styled.span`
  font-weight: var(--font-weight-light);
  margin-left: 0.3rem;
  color: var(--color-gray-0);
  pointer-events: none;
  text-overflow: ellipsis;
`;

function CommentText({ text }) {
  return <StyledTitle>{titleFix(text)}</StyledTitle>;
}

export default CommentText;
