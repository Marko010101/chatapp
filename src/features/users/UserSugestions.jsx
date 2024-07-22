import styled from "styled-components";

import { useUsers } from "./hooks/useUsers.js";
import UserLink from "./UserLink.jsx";
import ErrorText from "../../ui/ErrorText.jsx";
import { useUserById } from "./hooks/useUserById.js";
import { useCurrentDummyUser } from "./hooks/useCurrentDummyUser.js";
import { Link } from "react-router-dom";
const StyledUserSuggestions = styled.div``;

const StyledHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  & h4 {
    font-size: var(--font-size-small);
    color: var(--color-neutral-400);
    letter-spacing: 0.2px;
    font-weight: var(--font-weight-medium);
  }

  & a {
    color: var(--color-neutral-50);
    font-size: var(--font-size-tiny);
    font-weight: var(--font-weight-semibold);
    text-shadow: var(--text-shadow);
    &:hover {
      color: var(--color-neutral-500);
    }
  }
`;

function UserSugestions() {
  const {
    currentUserById,
    isLoading: currentUserIsLoading,
    error: errorCurrentUser,
  } = useCurrentDummyUser();
  const { userById = {}, isLoading, error } = useUserById(currentUserById?.id);

  const {
    dummyUsers,
    isLoading: isLoadingDummyUsers,
    error: errorDummyUsers,
  } = useUsers(true);

  if (errorDummyUsers || errorCurrentUser || error)
    return (
      <ErrorText>{errorDummyUsers || errorCurrentUser || error}</ErrorText>
    );

  return (
    <StyledUserSuggestions>
      <UserLink
        user={userById}
        currentUser={true}
        isLoadingDummyUsers={
          isLoadingDummyUsers || currentUserIsLoading || isLoading
        }
      />
      <StyledHeading>
        <h4>Suggested for you</h4>
        <Link to="/explore/people">See All</Link>
      </StyledHeading>
      {dummyUsers.data?.slice(0, 5).map((user) => (
        <UserLink
          user={user}
          key={user?.id}
          isLoadingDummyUsers={
            isLoadingDummyUsers || currentUserIsLoading || isLoading
          }
        />
      ))}
    </StyledUserSuggestions>
  );
}

export default UserSugestions;
