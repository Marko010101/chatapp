import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../services/apiDummyUser.js";

export const useUserById = (userId) => {
  const {
    data: userById,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getUserById(userId),
    enabled: userId !== undefined,
  });
  return { userById, isLoading, error };
};
