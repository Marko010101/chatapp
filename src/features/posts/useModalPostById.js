import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../services/apiPost.js";

export function useModalPostById(id) {
  const {
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryFn: () => getPostById(id),
    queryKey: ["ModalPost", id],
  });

  return { post, isLoading, error };
}
