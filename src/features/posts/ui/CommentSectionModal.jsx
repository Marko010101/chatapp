import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";

import Heading from "../../../ui/Heading.jsx";
import OwnerImage from "./OwnerImage.jsx";
import Title from "./CommentText.jsx";
import PostFormatedDate from "./PostFormatedDate.jsx";
import { useCurrentDummyUser } from "../../users/hooks/useCurrentDummyUser.js";
import useHover from "../../../hooks/useHover.js";
import UserProfileOnHover from "../../users/UserProfileOnHover.jsx";
import { RelativeDiv } from "../../../ui/RelativeDiv.jsx";
import Row from "../../../ui/Row.jsx";
import SpinnerMini from "../../../ui/loaders/SpinnerMini.jsx";

function CommentSectionModal({
  ownerPicture,
  firstName,
  lastName,
  text,
  date,
  onDeleteComment,
  owner,
  isDeletingComment,
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

      <StyledCommentBody type="vertical">
        <Heading as="h5">
          <RelativePositionWrapper
            onMouseEnter={handleHeaderMouseEnter}
            onMouseLeave={handleHeaderMouseLeave}
          >
            <Link to={`/profile/${owner.id}`}>
              <Title text={text} owner={owner} />
            </Link>
            {isHeaderHovered && <UserProfileOnHover user={owner} />}
          </RelativePositionWrapper>
        </Heading>
        <PostFormatedDate date={date} isModalComment={true} />
      </StyledCommentBody>

      <StyledDeleteSvg
        as="span"
        type="horizontal-center"
        isDeletingComment={isDeletingComment}
      >
        {currentUser?.id === owner.id &&
          (isDeletingComment ? (
            <SpinnerMini />
          ) : (
            <TiDeleteOutline onClick={onDeleteComment} />
          ))}
      </StyledDeleteSvg>
    </StyledCommentSection>
  );
}

export default CommentSectionModal;

const StyledCommentSection = styled.section`
  position: relative;
  display: flex;
  align-items: start;
  gap: 1.5rem;
  max-height: 20rem;
`;

const StyledCommentBody = styled(Row)`
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

const StyledDeleteSvg = styled(Row)`
  position: absolute;
  right: 0;

  ${(props) =>
    props.isDeletingComment &&
    css`
      height: 1.5rem;
      width: 1.5rem;
    `}

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
