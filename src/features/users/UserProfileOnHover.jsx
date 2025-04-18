import { Link } from "react-router-dom";
import styled from "styled-components";

import { useUserPosts } from "../posts/hooks/useUsersPosts.js";
import Row from "../../ui/Row.jsx";
import OwnerImage from "../posts/ui/OwnerImage.jsx";
import UserName from "./ui/UserName.jsx";
import PersonalInfo from "./ui/PersonalInfo.jsx";
import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";
import { navigatePostUrl } from "../../utils/navigatePostUrl.js";
import ErrorDisplay from "../../ui/ErrorDisplay.jsx";

function UserProfileOnHover({ user, left, isSuggestedPage }) {
  const { dateOfBirth, firstName, gender, id, lastName, picture, title } =
    user || {};
  const { currentUserPosts, isLoading, error } = useUserPosts(id);

  if (error) return <ErrorDisplay error={error} />;

  return (
    <StyledHoverPopup left={left} isSuggestedPage={isSuggestedPage}>
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
          ? currentUserPosts?.data?.slice(0, 3).map((post) => (
              <Link to={navigatePostUrl(id, post.id)} key={post?.id}>
                <img key={post?.id} src={post?.image} alt={`Post ${post.id}`} />
              </Link>
            ))
          : !isLoading && <span>No posts yet</span>}
      </StyledPosts>
      <StyledLink to={`messages/${id}`}>
        <button>Message</button>
      </StyledLink>
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
  top: ${(props) => (props.isSuggestedPage ? "85%" : "95%")};
  left: ${(props) => props.left || "18rem"};

  transform: translateX(-50%);
  width: 35rem;
  height: 27rem;
  padding: 1rem 0;
  z-index: 900;
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
  justify-content: ${(props) => (props.isLoading ? "center" : "start")};
  align-items: ${(props) => (props.isLoading ? "center" : "end")};

  & a {
    width: calc(100% / 3);
  }

  & img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
    cursor: pointer;
  }

  & > span {
    width: 100%;
    align-self: center;
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
`;
