import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../services/apiDummyUser.js";

export function useSignup() {
  const {
    mutate: signupOnDummy,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ firstName, lastName, email, picture }) =>
      createUser(firstName, lastName, email, picture),
  });
  return { signupOnDummy, isPending, error };
}
