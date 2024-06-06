import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/apiComments.js";

export function useComments(id) {
  const {
    isLoading,
    data: comments,
    error,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments({ id }),
  });

  return { isLoading, comments, error };
}
