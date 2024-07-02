import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../services/apiComments.js";

const useCreateComment = () => {
  return useMutation(
    async ({ comment, ownerId, postId }) => {
      const response = await createComment(comment, ownerId, postId);
      return response;
    },
    {
      onSuccess: (data, variables, context) => {
        console.log("Comment posted successfully:", data);
      },
      onError: (error, variables, context) => {
        console.error("Error posting comment:", error);
      },
    }
  );
};

export default useCreateComment;
