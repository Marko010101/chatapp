import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../../services/apiAuthFirebase.js";

export const useFirebaseSignup = () => {
  return useMutation(registerUser, {
    onSuccess: (user) => {
      toast.success("You have registered successfully! ✅");
      console.log("Registered user:", user);
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message}`);
      console.error("Registration error:", error);
    },
  });
};
