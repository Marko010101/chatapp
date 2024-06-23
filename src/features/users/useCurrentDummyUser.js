import { useQuery } from "@tanstack/react-query";
import { matchFirebaseAndDummyUsers } from "../../services/apiAuthFirebase.js";
import { useUserFirebase } from "./useUserFirebase.js";
import { useUsers } from "./useUsers.js";

export function useCurrentDummyUser() {
  const { dummyUsers } = useUsers();
  const { user } = useUserFirebase();
  const userUid = user?.uid;

  const {
    data: currentUserById,
    isLoading,
    error,
  } = useQuery(
    ["currentUser", userUid, dummyUsers],
    async () => await matchFirebaseAndDummyUsers(userUid, dummyUsers)
  );

  return { currentUserById, isLoading, error };
}
