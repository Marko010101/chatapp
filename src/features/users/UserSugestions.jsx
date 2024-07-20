import styled from "styled-components";
import { useUsers } from "./hooks/useUsers.js";
import UserLink from "./UserLink.jsx";
import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";
import ErrorText from "../../ui/ErrorText.jsx";
import { useUserById } from "./hooks/useUserById.js";
import { useCurrentDummyUser } from "./hooks/useCurrentDummyUser.js";

const StyledUserSuggestions = styled.div``;

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
  } = useUsers();

  if (isLoadingDummyUsers || currentUserIsLoading || isLoading)
    return <SpinnerMini />;

  if (errorDummyUsers || errorCurrentUser || error)
    return (
      <ErrorText>{errorDummyUsers || errorCurrentUser || error}</ErrorText>
    );

  return (
    <StyledUserSuggestions>
      <UserLink user={userById} />
      {dummyUsers?.data.map((user) => (
        <UserLink user={user} key={user?.id} />
      ))}
    </StyledUserSuggestions>
  );
}

export default UserSugestions;
