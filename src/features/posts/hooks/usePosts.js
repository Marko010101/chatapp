import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts, getPostsTotalLength } from "../../../services/apiPost.js";
import { useEffect, useState } from "react";
import { POST_PER_PAGE } from "../../../constants/POST.js";

export function usePosts() {
  const [totalPost, setTotalPost] = useState(0);
  const [initialPage, setInitialPage] = useState(null);

  async function postLength() {
    const totalPost = await getPostsTotalLength();
    setTotalPost(() => totalPost);
    return totalPost;
  }

  const initialPageCalc = Math.floor(totalPost / POST_PER_PAGE);

  useEffect(() => {
    postLength();
    setInitialPage(() => initialPageCalc);
  }, [setInitialPage, initialPageCalc]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    enabled: initialPage > 0 && totalPost > 0,
    queryKey: ["posts"],
    queryFn: ({ pageParam = initialPage }) => getPosts({ pageParam }),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage, allPage) => {
      console.log({ lastPage, allPage });
      const nextPage =
        initialPageCalc > allPage.length
          ? initialPage - allPage.length
          : undefined;
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
