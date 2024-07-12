import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/apiDummyUser.js";

export function useUsers() {
  const {
    data: dummyUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dummyUsers"],
    queryFn: getUsers,
  });

  return { dummyUsers, isLoading, error };
}
