import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../services/apiPost.js";

export function useModalPostById(id) {
  const isValidId = id != undefined;
  const {
    isLoading,
    data: post = {},
    error,
  } = useQuery(
    {
      queryFn: () => getPostById(id),
      queryKey: ["ModalPost", id],
    },
    { enabled: isValidId }
  );

  return { post, isLoading, error };
}
