import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../services/apiPost.js";

export function usePosts() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const posts = data ? data.data : [];

  return { posts, isLoading, error };
}
