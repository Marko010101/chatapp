import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { deletePostApi } from "../../../services/apiPost";
import { useDeletedPost } from "../../../context/DeletedPostContext.jsx";
import { redirectUrlAfterPostDelete } from "../../../utils/redirectUrlAfterPostDelete.js";
import { ModalContext } from "../../../ui/modal/Modal.jsx";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { markPostAsDeleted } = useDeletedPost();
  const { close } = useContext(ModalContext);

  const {
    mutate: deletePost,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (id) => {
      markPostAsDeleted(id);
      await deletePostApi(id);
    },
    onSuccess: (_, id) => {
      navigate(redirectUrlAfterPostDelete());
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["userPosts"], id);

      queryClient.invalidateQueries(["ModalPost"], id);
      queryClient.invalidateQueries(["comments", id]);

      toast.success("Post deleted successfully");

      close();
    },
    onError: (error) => {
      const errorMessage = error?.message || "Unknown error";
      toast.error(`Error deleting post: ${errorMessage}`);
    },
  });

  return { deletePost, isLoading, error };
}
