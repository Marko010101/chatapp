import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../../services/apiComments.js";
import { useDeletedPost } from "../../../context/DeletedPostContext.jsx";

export function useComments(postId) {
  const { deletedPostId } = useDeletedPost();
  const {
    isLoading,
    data: comments,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments({ postId }),
    enabled: deletedPostId !== postId && !!postId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return { isLoading, comments, error };
}
