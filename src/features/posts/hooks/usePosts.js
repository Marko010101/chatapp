import { useInfiniteQuery } from "@tanstack/react-query";

import { getPosts } from "../../../services/apiPost.js";
import { POST_PER_PAGE } from "../../../constants/POST.js";

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
    queryFn: ({ pageParam = 0 }) => getPosts({ pageParam }),
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / POST_PER_PAGE);
      const nextPage = lastPage.page + 1;
      return nextPage < totalPages ? nextPage : undefined;
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

// If we want to fetch posts from old to new
/* export function usePosts() {
  const [totalPost, setTotalPost] = useState(0);
  const [initialPage, setInitialPage] = useState(1);

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
 */
