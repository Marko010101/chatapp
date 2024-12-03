import styled, { css } from "styled-components";

import { useUserPosts } from "../posts/hooks/useUsersPosts.js";
import Row from "../../ui/Row.jsx";
import OwnerImage from "../posts/ui/OwnerImage.jsx";
import StyledErrorText from "../../ui/StyledErrorText.jsx";
import UserName from "./ui/UserName.jsx";
import PersonalInfo from "./ui/PersonalInfo.jsx";
import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";

function UserProfileOnHover({ user, left }) {
  const { dateOfBirth, firstName, gender, id, lastName, picture, title } = user;

  const { currentUserPosts, isLoading, error } = useUserPosts(id);

  if (error) return <StyledErrorText>{error}</StyledErrorText>;

  return (
    <StyledHoverPopup left={left}>
      <StyledHeader>
        <OwnerImage ownerPicture={picture} id={id} />
        {title && <span>{title}</span>}
        <UserName
          firstName={firstName}
          lastName={lastName}
          length={25}
          isUnderscore={true}
          heading="h4"
          id={id}
        />
      </StyledHeader>

      {gender && dateOfBirth ? (
        <PersonalInfo
          postLength={currentUserPosts?.data?.length}
          gender={gender}
          dateOfBirth={dateOfBirth}
        />
      ) : (
        <div></div>
      )}
      <StyledPosts type="horizontal-center" gap="0.3rem" isLoading={isLoading}>
        {isLoading && <SpinnerMini />}
        {currentUserPosts?.data.length
          ? currentUserPosts?.data
              ?.slice(0, 3)
              .map((post) => (
                <img key={post?.id} src={post?.image} alt={`Post ${post.id}`} />
              ))
          : !isLoading && <span>No posts yet</span>}
      </StyledPosts>
      <Row>
        <button>Message</button>
      </Row>
    </StyledHoverPopup>
  );
}

export default UserProfileOnHover;

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 5rem max-content max-content;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  width: 100%;

  & h4 {
    cursor: pointer;
  }

  & img {
    width: 5rem;
    max-width: 5rem;
    height: 5rem;
  }
`;

const StyledHoverPopup = styled.div`
  position: absolute;
  top: 95%;

  left: ${(props) => props.left || "18rem"};

  transform: translateX(-50%);
  width: 35rem;
  height: 27rem;
  padding: 1rem 0;
  z-index: 1000;
  background: var(--color-black);
  box-shadow: 0rem 0.5rem 3rem rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius-lg);
  border: none;
  display: grid;
  grid-template-rows: 6rem 1rem 11rem max-content;
  grid-row-gap: 1rem;
  opacity: 0;
  animation: fadeIn 0.5s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  & span {
    color: var(--color-neutral-400);
    font-size: var(--font-size-tiny);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.1px;
  }

  & button {
    width: 90%;
    padding: 1rem 0.5rem;
    border: none;
    margin: 0 auto;
    align-self: center;
    font-size: var(--font-size-small);
    border-radius: var(--border-radius-lg);
    background-color: var(--text-blue-500);

    &:hover {
      background-color: var(--text-blue-600);
    }
  }
`;

const StyledPosts = styled(Row)`
  align-items: ${(props) => (props.isLoading ? "center" : "end")};
  & img {
    width: calc(100% / 3);
    height: 10rem;
    object-fit: cover;
  }
`;
