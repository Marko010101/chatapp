import { useQuery } from "@tanstack/react-query";
import { getCurrentFirebaseUser } from "../../services/apiAuthFirebase.js";

export function useUserFirebase() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentFirebaseUser,
  });

  const isAuthenticated = !!user;

  return { isLoading, user, isAuthenticated };
}
