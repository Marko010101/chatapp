import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";

import Heading from "../../../ui/Heading.jsx";
import { fixedSizeFullName } from "../../../utils/helpers.js";
import OwnerImage from "./OwnerImage.jsx";
import Title from "./Title.jsx";
import PostFormatedDate from "./PostFormatedDate.jsx";
import { useCurrentDummyUser } from "../../users/hooks/useCurrentDummyUser.js";

const StyledCommentSection = styled.section`
  display: flex;
  flex-direction: column;

  & > article {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: max-content 1fr;
    grid-column-gap: 1.5rem;

    & h5 {
      line-height: 1.4rem;
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-medium);
      align-self: center;
      & > span {
        font-weight: var(--font-weight-light);
        margin-left: 0.3rem;
        color: var(--color-gray-0);
      }
    }
    & > *:last-child {
      grid-column: 2 / 3;
      align-self: center;
      line-height: 1.4rem;
    }
  }
`;

function CommentSectionModal({
  ownerPicture,
  firstName,
  lastName,
  text,
  date,
  onDeleteComment,
  owner,
}) {
  const { currentUserById } = useCurrentDummyUser();
  return (
    <StyledCommentSection>
      <article>
        <OwnerImage ownerPicture={ownerPicture} />
        <Heading as="h5">
          {fixedSizeFullName(firstName, lastName, 30)} <Title text={text} />
        </Heading>
        <PostFormatedDate date={date} isModalComment={true} />

        {currentUserById?.id === owner && (
          <TiDeleteOutline onClick={onDeleteComment} />
        )}
      </article>
    </StyledCommentSection>
  );
}

export default CommentSectionModal;
