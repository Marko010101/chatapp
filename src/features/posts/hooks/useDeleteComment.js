import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentById } from "../../../services/apiComments.js";

export function useDeleteComment(postId) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteComment,
    isLoading,
    error,
  } = useMutation(
    async (id) => {
      await deleteCommentById(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", postId]);
        toast.success("Comment successfully deleted!");
      },
    }
  );

  return { deleteComment, isLoading, error };
}
