import { useQuery } from "@tanstack/react-query";
import { getPostsByUser } from "../../services/apiPost.js";

export const useUserPosts = (userId) => {
  const isValidId = userId != undefined;
  const {
    data: currentUserPosts,
    isLoading,
    error,
  } = useQuery(["userPosts", userId], () => getPostsByUser(userId), {
    enabled: isValidId,
  });
  return { currentUserPosts, isLoading, error };
};
