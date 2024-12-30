import ErrorDisplay from "../../ui/ErrorDisplay.jsx";
import { useUsers } from "./hooks/useUsers.js";
import UserLink from "./UserLink.jsx";
import { useCurrentDummyUser } from "./hooks/useCurrentDummyUser.js";

function DummyUsersList({
  isLoading = false,
  isSuggestedPage = false,
  slicedNumber,
}) {
  const { currentUser } = useCurrentDummyUser();
  const {
    dummyUsers: realUsers,
    isLoading: isLoadingRealUsers,
    error: errorRealUsers,
  } = useUsers(true);
  const {
    dummyUsers: dummyUsersData,
    isLoading: isLoadingDummyUsers,
    error: errorDummyUsers,
  } = useUsers();

  if (errorRealUsers || errorDummyUsers)
    return <ErrorDisplay error={errorRealUsers || errorDummyUsers} />;

  // Ensure fallback values to avoid undefined errors
  const realUsersData = realUsers?.data || [];
  const dummyUsersList = dummyUsersData?.data || [];

  const combinedUsers = slicedNumber
    ? [
        ...realUsersData.filter((realUser) => realUser?.id !== currentUser?.id),
        ...dummyUsersList,
      ]
    : [
        ...realUsersData.filter((realUser) => realUser?.id !== currentUser?.id),
        ...dummyUsersList,
      ];

  return (
    <div>
      {combinedUsers.length !== 0 &&
        combinedUsers
          .slice(0, slicedNumber || combinedUsers.length)
          .map((user) => (
            <UserLink
              user={user}
              key={user?.id}
              isSuggestedPage={isSuggestedPage}
              isLoadingDummyUsers={
                isLoading || isLoadingDummyUsers || isLoadingRealUsers
              }
            />
          ))}
    </div>
  );
}

export default DummyUsersList;
