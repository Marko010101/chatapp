import styled from "styled-components";

import UserLink from "./UserLink.jsx";
import ErrorText from "../../ui/ErrorText.jsx";
import { useUserById } from "./hooks/useUserById.js";
import { useCurrentDummyUser } from "./hooks/useCurrentDummyUser.js";
import { Link } from "react-router-dom";
import DummyUsersList from "./DummyUsersList.jsx";

function UserSugestions() {
  const {
    currentUser,
    isLoading: currentUserIsLoading,
    error: errorCurrentUser,
  } = useCurrentDummyUser();
  const { userById = {}, isLoading, error } = useUserById(currentUser?.id);

  if (errorCurrentUser || error)
    return <ErrorText>{errorCurrentUser || error}</ErrorText>;

  return (
    <StyledUserSuggestions>
      <UserLink
        user={userById}
        currentUser={true}
        isLoadingDummyUsers={currentUserIsLoading || isLoading}
      />
      <StyledHeading>
        <h4>Suggested for you</h4>
        <Link to="/explore/people">See All</Link>
      </StyledHeading>
      <DummyUsersList
        isLoading={currentUserIsLoading || isLoading}
        slicedNumber={5}
      />
    </StyledUserSuggestions>
  );
}

export default UserSugestions;

const StyledUserSuggestions = styled.div`
  /* cursor: ${(props) => (props.currentUserIsLoading ? "wait" : "pointer")}; */
`;

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
