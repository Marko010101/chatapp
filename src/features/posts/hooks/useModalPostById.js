import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../../services/apiPost.js";

export function useModalPostById(id) {
  const {
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["ModalPost", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

  return { post, isLoading, error };
}
