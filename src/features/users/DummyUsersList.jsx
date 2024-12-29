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

  const combinedUsers = slicedNumber
    ? [
        ...(realUsers?.data.filter(
          (realUser) => realUser?.id !== currentUser?.id
        ) || []),
        ...(dummyUsersData?.data || []),
      ]
    : [
        ...(realUsers?.data?.filter(
          (realUser) => realUser?.id !== currentUser?.id
        ) || []),
        ,
        ...(dummyUsersData?.data || []),
      ];

  return (
    <div>
      {combinedUsers.length !== 0 &&
        combinedUsers
          ?.slice(0, slicedNumber)
          ?.map((user) => (
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
