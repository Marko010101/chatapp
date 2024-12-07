import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../../services/apiPost.js";
import { useDeletedPost } from "../../../context/DeletedPostContext.jsx";

export function useModalPostById(id) {
  const { deletedPostId } = useDeletedPost();

  const {
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["ModalPost", id],
    queryFn: () => getPostById(id),
    enabled: id !== deletedPostId && !!id,
  });

  return { post, isLoading, error };
}
