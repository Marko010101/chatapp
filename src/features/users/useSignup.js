import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUser } from "../../services/apiUser.js";

export function useSignup() {
  const { mutate: signupOnDummy, isLoading } = useMutation({
    mutationFn: ({ firstName, lastName, email }) =>
      createUser(firstName, lastName, email),
    onSuccess: () => {
      toast.success("Account successfully created!");
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message}`);
    },
  });

  return { signupOnDummy, isLoading };
}
