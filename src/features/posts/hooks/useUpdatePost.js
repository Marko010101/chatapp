import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../../services/apiPost.js";
import toast from "react-hot-toast";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, updatedPostData }) => updatePost(id, updatedPostData),
    {
      onSuccess: (data, variables) => {
        const { id } = variables;

        const currentPosts = queryClient.getQueryData(["posts"]);
        if (currentPosts && currentPosts.data) {
          const postIndex = currentPosts.data.findIndex(
            (post) => post.id === id
          );
          if (postIndex !== -1) {
            const updatedPosts = [...currentPosts.data];
            updatedPosts[postIndex] = { ...updatedPosts[postIndex], ...data };
            queryClient.setQueryData(["posts"], {
              ...currentPosts,
              data: updatedPosts,
            });
          }
        }

        const currentModalPost = queryClient.getQueryData(["ModalPost", id]);
        if (currentModalPost) {
          queryClient.setQueryData(["ModalPost", id], {
            ...currentModalPost,
            ...data,
          });
        }

        toast.success("Post updated successfully");
      },
      onError: (error) => {
        toast.error(`Failed to update post: ${error.message}`);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["ModalPost"]);
      },
    }
  );

  const { mutate, isLoading, error } = mutation;

  return { mutate, isLoading, error };
}
