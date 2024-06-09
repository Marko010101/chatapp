import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/apiUser.js";

export function useSignup() {
  const { mutate: signupOnDummy, isLoading } = useMutation({
    mutationFn: ({ firstName, lastName, email }) =>
      createUser(firstName, lastName, email),
  });

  return { signupOnDummy, isLoading };
}
