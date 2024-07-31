import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../../services/apiPost.js";

export function usePosts() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      console.log({ lastPage, allPage });
      const nextPage = lastPage.data.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
