import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/apiDummyUser.js";

export function useUsers(realUsers = false,) {
  const {
    data: dummyUsers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dummyUsers", realUsers],
    queryFn: () => getUsers(realUsers),
  });

  return { dummyUsers, isLoading, error };
}
