import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../../services/apiAuthFirebase.js";

// Hook to handle Firebase user registration
export const useFirebaseSignup = () => {
  return useMutation(registerUser, {
    onSuccess: (user) => {
      toast.success("You have registered successfully! ✅");
      console.log("Registered user:", user); // Log user object for further use
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message}`);
      console.error("Registration error:", error); // Log error for debugging
    },
  });
};
