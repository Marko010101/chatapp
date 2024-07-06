import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../services/apiComments.js";

const useCreateComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ comment, ownerId, postId }) => {
      const response = await createComment(comment, ownerId, postId);
      return response;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["comments", variables.postId]);
      },
      onError: (error) => {
        console.error("Error posting comment:", error);
      },
    }
  );

  return { mutate: mutation.mutate, isLoading: mutation.isLoading };
};

export default useCreateComment;
