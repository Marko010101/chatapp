import styled from "styled-components";
import Heading from "../../ui/Heading.jsx";
import { fixedSizeFullName } from "../../utils/helpers.js";
import OwnerImage from "./OwnerImage.jsx";
import Title from "./Title.jsx";

const StyledCommentSection = styled.section`
  display: flex;
  flex-direction: column;

  & > article {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 1.5rem;
    & h5 {
      line-height: 1.4rem;
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-medium);
      & > span {
        font-weight: var(--font-weight-light);
        margin-left: 0.3rem;
        color: var(--color-gray-0);
      }
    }
  }
`;

function CommentSectionModal({ ownerPicture, firstName, lastName, text }) {
  return (
    <StyledCommentSection>
      <article>
        <OwnerImage ownerPicture={ownerPicture} />
        <Heading as="h5">
          {fixedSizeFullName(firstName, lastName, 30)} <Title text={text} />
        </Heading>
      </article>
    </StyledCommentSection>
  );
}

export default CommentSectionModal;
