import styled from "styled-components";
import { fixedSizeFullName } from "../../../utils/fixedSizeFullName.js";
import HoveredName from "../../users/ui/hoverComponentsCard/HoveredUsername.jsx";
import Row from "../../../ui/Row.jsx";

const StyledTitle = styled(Row)`
  font-weight: var(--font-weight-light);
  color: var(--color-gray-0);
  text-overflow: ellipsis;
`;

function CommentText({ text, owner }) {
  return (
    <StyledTitle>
      <HoveredName user={owner} text={text} left="17.5rem" />
    </StyledTitle>
  );
}

export default CommentText;
