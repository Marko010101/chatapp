import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../services/apiDummyUser.js";

export const useUserById = (userId) => {
  const isValidId = userId != undefined;
  const {
    data: userById,
    isLoading,
    error,
  } = useQuery(["useById", userId], () => getUserById(userId), {
    enabled: isValidId,
  });
  return { userById, isLoading, error };
};
