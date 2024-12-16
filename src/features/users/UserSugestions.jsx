import { Link } from "react-router-dom";
import styled from "styled-components";

import UserLink from "./UserLink.jsx";
import { useUserById } from "./hooks/useUserById.js";
import { useCurrentDummyUser } from "./hooks/useCurrentDummyUser.js";
import DummyUsersList from "./DummyUsersList.jsx";
import Row from "../../ui/Row.jsx";
import ErrorDisplay from "../../ui/ErrorDisplay.jsx";

function UserSugestions() {
  const {
    currentUser,
    isLoading: currentUserIsLoading,
    error: errorCurrentUser,
  } = useCurrentDummyUser();
  const { userById = {}, isLoading, error } = useUserById(currentUser?.id);
  if (errorCurrentUser || error)
    return <ErrorDisplay error={errorCurrentUser || error} />;

  return (
    <>
      <UserLink
        user={userById}
        currentUser={true}
        isLoadingDummyUsers={currentUserIsLoading || isLoading}
      />
      <StyledHeading type="horizontal" margin="2rem 0 0 0">
        <h4>Suggested for you</h4>
        <Link to="/explore/people">See All</Link>
      </StyledHeading>
      <DummyUsersList
        isLoading={currentUserIsLoading || isLoading}
        slicedNumber={5}
      />
    </>
  );
}

export default UserSugestions;

const StyledHeading = styled(Row)`
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
