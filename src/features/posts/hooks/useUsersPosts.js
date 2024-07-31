import { useQuery } from "@tanstack/react-query";
import { getPostsByUser } from "../../../services/apiPost.js";

export const useUserPosts = (userId) => {
  const {
    data: currentUserPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getPostsByUser(userId),
    enabled: userId !== undefined,
  });

  return { currentUserPosts, isLoading, error };
};
