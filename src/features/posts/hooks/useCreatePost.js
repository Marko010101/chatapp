import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../../services/apiPost";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const {
    mutate: createUserPost,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      //   queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("userPosts");
    },
  });

  return { createUserPost, isLoading, error };
}
