import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";

import Heading from "../../../ui/Heading.jsx";
import OwnerImage from "./OwnerImage.jsx";
import Title from "./CommentText.jsx";
import PostFormatedDate from "./PostFormatedDate.jsx";
import { useCurrentDummyUser } from "../../users/hooks/useCurrentDummyUser.js";
import useHover from "../../../hooks/useHover.js";
import UserProfileOnHover from "../../users/UserProfileOnHover.jsx";
import { RelativeDiv } from "../../../ui/RelativeDiv.jsx";
import UserName from "../../users/ui/UserName.jsx";

const StyledCommentSection = styled.section`
  position: relative;
  display: flex;
  align-items: start;
  gap: 1.5rem;
  max-height: 20rem;
`;

const StyledCommentBody = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 38rem;
  line-break: anywhere;
`;

const RelativePositionWrapper = styled(RelativeDiv)`
  display: inline;

  & h5 {
    width: max-content;
    display: inline;

    &:hover {
      color: var(--color-neutral-400);
      cursor: pointer;
    }
  }
`;

const StyledDeleteSvg = styled.span`
  position: absolute;
  right: 0;

  & svg {
    cursor: pointer;

    &:hover {
      color: var(--color-neutral-400);
    }
    &:active {
      color: var(--color-neutral-500);
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
  const { currentUser } = useCurrentDummyUser();

  const {
    isHovered: isImageHovered,
    handleMouseEnter: handleImageMouseEnter,
    handleMouseLeave: handleImageMouseLeave,
  } = useHover();

  const {
    isHovered: isHeaderHovered,
    handleMouseEnter: handleHeaderMouseEnter,
    handleMouseLeave: handleHeaderMouseLeave,
  } = useHover();

  return (
    <StyledCommentSection>
      <RelativePositionWrapper
        onMouseEnter={handleImageMouseEnter}
        onMouseLeave={handleImageMouseLeave}
      >
        <OwnerImage
          ownerPicture={ownerPicture}
          haveBorder={true}
          id={owner?.id}
        />
        {isImageHovered && <UserProfileOnHover user={owner} />}
      </RelativePositionWrapper>

      <StyledCommentBody>
        <Heading as="h5">
          <RelativePositionWrapper
            onMouseEnter={handleHeaderMouseEnter}
            onMouseLeave={handleHeaderMouseLeave}
          >
            <UserName
              firstName={firstName}
              lastName={lastName}
              length={30}
              heading="h5"
              id={owner?.id}
            />
            {isHeaderHovered && <UserProfileOnHover user={owner} />}
          </RelativePositionWrapper>
          <Title text={text} />
        </Heading>
        <PostFormatedDate date={date} isModalComment={true} />
      </StyledCommentBody>

      <StyledDeleteSvg>
        {currentUser?.id === owner.id && (
          <TiDeleteOutline onClick={onDeleteComment} />
        )}
      </StyledDeleteSvg>
    </StyledCommentSection>
  );
}

export default CommentSectionModal;
