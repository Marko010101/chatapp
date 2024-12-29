import { useQuery } from "@tanstack/react-query";
import { matchFirebaseAndDummyUsers } from "../../../services/apiAuthFirebase.js";
import { useUserFirebase } from "../hooks/useUserFirebase.js";
import { useUsers } from "./useUsers.js";
import { deleteUser } from "../../../services/apiDummyUser.js";

export function useCurrentDummyUser() {
  const { dummyUsers, isLoading: isLoadingDummyUsers } = useUsers(true);

  const { user } = useUserFirebase();
  const userUid = user?.uid;

  const isUsersReady = !isLoadingDummyUsers && dummyUsers?.data?.length > 0;

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser", userUid, dummyUsers],
    enabled: isUsersReady,
    queryFn: async () =>
      await matchFirebaseAndDummyUsers(userUid, dummyUsers?.data),
  });

  return { currentUser, isLoading, error };
}
