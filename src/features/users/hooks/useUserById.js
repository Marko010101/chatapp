import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../services/apiDummyUser.js";

export const useUserById = (userId) => {
  const isValidId = userId !== undefined && userId !== null;

  const {
    data: userById,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userById", userId],
    queryFn: () => getUserById(userId),
    enabled: isValidId,
  });

  return { userById, isLoading, error };
};
