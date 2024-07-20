import { useQuery } from "@tanstack/react-query";
import { matchFirebaseAndDummyUsers } from "../../../services/apiAuthFirebase.js";
import { useUserFirebase } from "../hooks/useUserFirebase.js";
import { useUsers } from "./useUsers.js";

export function useCurrentDummyUser() {
  const realUser = true;
  const { dummyUsers } = useUsers(realUser);
  const { user } = useUserFirebase();
  const userUid = user?.uid;
  const {
    data: currentUserById,
    isLoading,
    error,
  } = useQuery(
    ["currentUser", userUid, dummyUsers],
    async () => await matchFirebaseAndDummyUsers(userUid, dummyUsers?.data)
  );

  return { currentUserById, isLoading, error };
}
