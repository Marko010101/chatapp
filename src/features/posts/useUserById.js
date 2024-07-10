import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiDummyUser.js";

export const useUserById = (userId) => {
  const isValidId = userId != undefined;
  const {
    data: commentOwner,
    isLoading,
    error,
  } = useQuery(["userPosts", userId], () => getUserById(userId), {
    enabled: isValidId,
  });
  return { commentOwner, isLoading, error };
};
