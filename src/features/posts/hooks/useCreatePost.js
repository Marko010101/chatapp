import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../../services/apiPost";
import toast from "react-hot-toast";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const {
    mutate: createUserPost,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries("userPosts");
      toast.success("Post created successfully!");
    },
  });
  return { createUserPost, isLoading, error };
}
