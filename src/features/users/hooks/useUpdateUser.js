import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../../services/apiDummyUser.js";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["user", variables.id]);
      toast.success("User updated successfully!");
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });
}
