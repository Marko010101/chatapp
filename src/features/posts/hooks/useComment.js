import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../../services/apiComments.js";

export function useComments(postId) {
  const {
    isLoading,
    data: comments,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments({ postId }),
  });

  return { isLoading, comments, error };
}
