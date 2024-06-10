import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../../services/apiAuthFirebase.js";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => logInUser({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          toast.error("The provided email or password is incorrect.");
          break;
        case "auth/too-many-requests":
          toast.error(
            "Too many unsuccessful login attempts. Please try again later."
          );
          break;
        default:
          toast.error("An error occurred. Please try again later.");
      }
    },
  });

  return { login, isLoading, error };
}
