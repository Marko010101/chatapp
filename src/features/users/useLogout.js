import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../services/apiAuthFirebase.js";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      localStorage.removeItem("accessToken");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Failed to logout. Please try again later.");
    },
  });

  return { logout };
}
