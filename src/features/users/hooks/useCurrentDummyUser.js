import { useQuery } from "@tanstack/react-query";
import { matchFirebaseAndDummyUsers } from "../../../services/apiAuthFirebase.js";
import { useUserFirebase } from "../hooks/useUserFirebase.js";
import { useUsers } from "./useUsers.js";

export function useCurrentDummyUser() {
  const { dummyUsers } = useUsers(true);
  const { user } = useUserFirebase();
  const userUid = user?.uid;

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser", userUid, dummyUsers],
    queryFn: async () =>
      await matchFirebaseAndDummyUsers(userUid, dummyUsers?.data),
  });

  return { currentUser, isLoading, error };
}
