import styled, { css } from "styled-components";
import { calculateAge } from "../../utils/helpers.js";
import { useUserPosts } from "../posts/hooks/useUsersPosts.js";
import Row from "../../ui/Row.jsx";
import OwnerImage from "../posts/ui/OwnerImage.jsx";
import ErrorText from "../../ui/ErrorText.jsx";
import UserName from "./ui/UserName.jsx";

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

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1.5rem;
  width: 100%;

  & h4 {
    cursor: pointer;
    margin-left: -1rem;
  }

  & img {
    width: 6rem;
    scale: 1.3;
    height: auto;
  }
`;

const PersonalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledPosts = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: end;
  justify-content: center;
  & img {
    width: calc(100% / 3);
    height: 10rem;
    object-fit: cover;
  }
`;

function UserProfileOnHover({ user, left }) {
  const {
    dateOfBirth,
    email,
    firstName,
    gender,
    id,
    lastName,
    location,
    phone,
    picture,
    registerDate,
    title,
    updatedDate,
  } = user;

  const { currentUserPosts, isLoading, error } = useUserPosts(id);

  if (isLoading) return null;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <StyledHoverPopup left={left}>
      <StyledHeader>
        <OwnerImage ownerPicture={picture} />
        {title && <span>{title}</span>}{" "}
        <UserName
          firstName={firstName}
          lastName={lastName}
          length={25}
          isUnderscore={true}
          heading="h4"
        />
      </StyledHeader>

      {gender && dateOfBirth ? (
        <PersonalInfo>
          <h6>Posts {currentUserPosts?.data?.length}</h6>
          <span>{gender}</span>
          <span>{calculateAge(dateOfBirth)} Years old</span>
        </PersonalInfo>
      ) : (
        <div></div>
      )}
      <StyledPosts>
        {currentUserPosts?.data.length ? (
          currentUserPosts?.data
            ?.slice(0, 3)
            .map((post) => (
              <img key={post?.id} src={post?.image} alt={`Post ${post.id}`} />
            ))
        ) : (
          <span>No posts yet</span>
        )}
      </StyledPosts>
      <Row>
        <button>Message</button>
      </Row>
    </StyledHoverPopup>
  );
}

export default UserProfileOnHover;
