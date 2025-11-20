import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChat } from "../../../services/apiMessages";

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries(["chatCollectionId"]);
    },
  });

  return mutation;
};
