import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../../services/apiPost";

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
    },
  });
  return { createUserPost, isLoading, error };
}
