import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "../../../services/apiMessages.js";

export const useChatCollectionId = () => {
  const {
    data: chatCollectionId,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["chatCollectionId"],
    queryFn: fetchChats,
  });

  return { chatCollectionId, isLoading, error, refetch };
};
