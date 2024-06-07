import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUser.js";

export function useUsers() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { users, isLoading, error };
}