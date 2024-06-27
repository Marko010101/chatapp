import { useMutation } from "@tanstack/react-query";
import { createComment } from "../api";

const useCreateComment = () => {
  return useMutation(
    async ({ comment, ownerId }) => {
      const response = await createComment(comment, ownerId);
      return response;
    },
    {
      // Optional onSuccess and onError callbacks
      onSuccess: (data, variables, context) => {
        console.log("Comment posted successfully:", data);
        // Optionally update your UI or state here
      },
      onError: (error, variables, context) => {
        console.error("Error posting comment:", error);
        // Optionally handle the error (e.g., set error state)
      },
    }
  );
};

export default useCreateComment;
