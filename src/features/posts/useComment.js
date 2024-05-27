import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/postApi.js";

export function useComments(id) {
  const {
    isLoading,
    data: comments,
    error,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments({ id }), // Pass id to getComments function
  });

  return { isLoading, comments, error };
}
