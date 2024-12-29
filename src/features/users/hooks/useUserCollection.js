import { useQuery } from "@tanstack/react-query";
import { fetchUserCollection } from "../../../services/apiAuthFirebase.js";

export const useUserCollection = () => {
  const {
    data: userCollection,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userCollection"],
    queryFn: fetchUserCollection,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { userCollection, isLoading, error };
};
