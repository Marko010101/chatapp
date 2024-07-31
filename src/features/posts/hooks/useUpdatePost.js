import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../../services/apiPost.js";
import toast from "react-hot-toast";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, updatedPostData }) => updatePost(id, updatedPostData),
    onMutate: async (variables) => {
      const { id, updatedPostData } = variables;

      await queryClient.cancelQueries(["posts"]);
      await queryClient.cancelQueries(["ModalPost", id]);

      const previousPosts = queryClient.getQueryData(["posts"]);
      const previousModalPost = queryClient.getQueryData(["ModalPost", id]);

      queryClient.setQueryData(["posts"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((post) =>
              post.id === id ? { ...post, ...updatedPostData } : post
            ),
          })),
        };
      });

      if (previousModalPost) {
        queryClient.setQueryData(["ModalPost", id], {
          ...previousModalPost,
          ...updatedPostData,
        });
      }

      return { previousPosts, previousModalPost };
    },
    onError: (error, variables, context) => {
      toast.error(`Failed to update post: ${error.message}`);
      queryClient.setQueryData(["posts"], context.previousPosts);
      if (context.previousModalPost) {
        queryClient.setQueryData(
          ["ModalPost", variables.id],
          context.previousModalPost
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["ModalPost", variables.id]);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
