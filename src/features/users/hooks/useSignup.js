import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../services/apiDummyUser.js";

export function useSignup() {
  const {
    mutate: signupOnDummy,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ firstName, lastName, email }) =>
      createUser(firstName, lastName, email),
  });
  return { signupOnDummy, isPending, error };
}
