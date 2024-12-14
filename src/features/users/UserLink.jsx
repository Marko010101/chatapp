import styled, { keyframes, css } from "styled-components";

import {
  fixedSizeFullName,
  getFormattedDateInfo,
} from "../../utils/helpers.js";
import StyledButton from "../../ui/Buttons/StyledButton.jsx";
import { useUserById } from "./hooks/useUserById.js";
import Row from "../../ui/Row.jsx";
import Heading from "../../ui/Heading.jsx";
import defaultUserImg from "../../assets/default-user.jpg";
import HoveredImg from "./ui/hoverComponentsCard/HoveredImg.jsx";
import HoveredUsername from "./ui/hoverComponentsCard/HoveredUsername.jsx";

function UserLink({ user, currentUser, isLoadingDummyUsers, isSuggestedPage }) {
  const { firstName, id, lastName, picture = defaultUserImg } = user;
  const { userById = {}, isLoading: isLoadingUserById } = useUserById(id);
  const { registerDate, location, email } = userById;
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
        <HoveredImg
          user={userById}
          isSuggestedPage={isSuggestedPage}
          left={"7rem"}
        />

        <Row type="vertical">
          <HoveredUsername user={userById} />

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
