import styled from "styled-components";
import { fixedSizeFullName } from "../../../utils/fixedSizeFullName.js";
import HoveredName from "../../users/ui/hoverComponentsCard/HoveredUsername.jsx";
import Row from "../../../ui/Row.jsx";

const StyledTitle = styled(Row)`
  font-weight: var(--font-weight-light);
  color: var(--color-gray-0);
  text-overflow: ellipsis;
  /* pointer-events: none;
  text-align: start; */

  & p {
    display: inline;
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    pointer-events: auto;
  }
  & > div {
    display: flex;
    gap: 1rem;
  }
`;

function CommentText({ text, owner }) {
  return (
    <StyledTitle as="span">
      <HoveredName user={owner} text={text} left="17.5rem" />
    </StyledTitle>
  );
}

export default CommentText;
