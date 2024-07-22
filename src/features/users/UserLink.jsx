import styled, { keyframes, css } from "styled-components";
import {
  fixedSizeFullName,
  getFormattedDateInfo,
} from "../../utils/helpers.js";
import Button from "../../ui/Buttons/Button.jsx";
import { useUserById } from "./hooks/useUserById.js";
import OwnerImage from "../posts/ui/OwnerImage.jsx";

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
  display: grid;
  grid-template-columns: max-content 1fr 5rem;
  gap: 1.2rem;
  margin-top: 2rem;
  align-items: center;

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

  & div {
    display: flex;
    flex-direction: column;
  }

  & span {
    color: var(--color-neutral-400);
    font-size: var(--font-size-tiny);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.1px;
  }

  & button {
    font-size: var(--font-size-tiny);
  }
`;

function UserLink({ user, currentUser, isLoadingDummyUsers }) {
  const {
    firstName,
    id,
    lastName,
    picture = "../../../public/default-user.jpg",
  } = user;
  const {
    userById = {},
    isLoading: isLoadingUserById,
    error,
  } = useUserById(id);
  const { registerDate } = userById;

  const { relativeTime, formattedDate, diffInMonths } =
    getFormattedDateInfo(registerDate);
  console.log(userById);

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
    <StyledUser>
      <OwnerImage ownerPicture={picture} />
      <div>
        <h5>{fixedSizeFullName(firstName, lastName, 30, true)}</h5>
        {!currentUser ? (
          <span>
            {diffInMonths > 0.9 ? "Suggested for you" : "New to Petfolio"}
          </span>
        ) : (
          <span>{fixedSizeFullName(firstName, lastName, 30)}</span>
        )}
      </div>
      {!currentUser && <Button>message</Button>}
    </StyledUser>
  );
}

export default UserLink;
