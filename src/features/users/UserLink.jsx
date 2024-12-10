import styled, { keyframes, css } from "styled-components";

import {
  fixedSizeFullName,
  getFormattedDateInfo,
} from "../../utils/helpers.js";
import StyledButton from "../../ui/Buttons/StyledButton.jsx";
import { useUserById } from "./hooks/useUserById.js";
import OwnerImage from "../posts/ui/OwnerImage.jsx";
import useHover from "../../hooks/useHover.js";
import UserProfileOnHover from "./UserProfileOnHover.jsx";
import Row from "../../ui/Row.jsx";
import UserName from "./ui/UserName.jsx";
import { RelativeDiv } from "../../ui/RelativeDiv.jsx";
import Heading from "../../ui/Heading.jsx";
import defaultUserImg from "../../assets/default-user.jpg";

function UserLink({ user, currentUser, isLoadingDummyUsers, isSuggestedPage }) {
  const { firstName, id, lastName, picture = defaultUserImg } = user;
  const { userById = {}, isLoading: isLoadingUserById } = useUserById(id);
  const { registerDate, location, email } = userById;
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

  const { diffInMonths } = getFormattedDateInfo(registerDate);
  if (isLoadingDummyUsers || isLoadingUserById) {
    return (
      <StyledUser isLoading={true}>
        <div className="image-user" />
        <div className="text-loader" />
        {!currentUser && <div className="button-loader" />}
      </StyledUser>
    );
  }

  return (
    <>
      <StyledUser isSuggestedPage={isSuggestedPage}>
        <Row
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
        >
          <OwnerImage ownerPicture={picture} id={id} />
          {!currentUser && isImageHovered && (
            <UserProfileOnHover
              user={userById}
              left={"7rem"}
              isSuggestedPage={isSuggestedPage}
            />
          )}
        </Row>
        <Row type="vertical">
          <RelativeDiv
            onMouseEnter={handleHeaderMouseEnter}
            onMouseLeave={handleHeaderMouseLeave}
          >
            <UserName
              firstName={firstName}
              lastName={lastName}
              length={30}
              isUnderscore
              heading="h5"
              id={id}
            />
            {!currentUser && isHeaderHovered && (
              <UserProfileOnHover user={userById} left={"7rem"} />
            )}
          </RelativeDiv>
          <Row>
            <span>
              {!currentUser ? (
                <>
                  <span>
                    {diffInMonths > 0.1
                      ? "Suggested for you"
                      : "New to Petfolio"}
                  </span>
                  {isSuggestedPage && (
                    <Heading as="h6">
                      {location?.country ? location?.country : email}
                    </Heading>
                  )}
                </>
              ) : (
                <h5>{fixedSizeFullName(firstName, lastName, 30)}</h5>
              )}
            </span>
          </Row>
        </Row>
        {!currentUser && <StyledButton>message</StyledButton>}
      </StyledUser>
    </>
  );
}

export default UserLink;

// Keyframes for the wave animation
const waveAnimation = keyframes`
  0% {
    background-position: -20rem 0;
  }
  100% {
    background-position: calc(20rem + 100%) 0;
  }
`;

const StyledUser = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: max-content 1fr 5rem;
  gap: 1.2rem;
  margin-top: 2rem;
  align-items: center;

  ${(props) =>
    props.isSuggestedPage &&
    css`
      width: 45rem;
    `}

  /* Animation for loading */
  ${(props) =>
    props.isLoading &&
    css`
      & .image-user,
      & .text-loader,
      & .button-loader {
        background: linear-gradient(
          90deg,
          var(--color-neutral-800) 25%,
          var(--color-neutral-900) 50%,
          var(--color-neutral-800) 75%
        );
        background-size: 20rem 100%;
        animation: ${waveAnimation} 1.5s infinite linear;
      }

      & .image-user {
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 50%;
      }

      & .text-loader {
        width: 100%;
        height: 1.4rem;
        margin-left: 1rem;
        border-radius: 0.4rem;
      }

      & .button-loader {
        width: 4rem;
        height: 1.5rem;
        margin-left: 1rem;
        border-radius: 0.4rem;
      }
    `}


   & h5 {
    position: relative;
    cursor: pointer;
    width: max-content;
  }

  & span {
    color: var(--color-neutral-400);
    font-size: var(--font-size-tiny);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.1px;
  }

  & button {
    font-size: var(--font-size-tiny);

    ${(props) =>
      props.isSuggestedPage &&
      css`
        font-size: var(--font-size-small);
      `}
  }
`;
