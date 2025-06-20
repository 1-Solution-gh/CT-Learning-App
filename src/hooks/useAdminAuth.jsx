import { BASE_URL } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./useUser";

const postLoginData = async ({ email, password }) => {
  const response = await axios.post(
    `${BASE_URL}//login/instructor`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useUser();

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: ({ email, password }) => postLoginData({ email, password }),
    onSuccess: (response) => {
      console.log("Login Success:", response);

      if (response.message === "Login successful" && response.user) {
        // Store token in localStorage
        localStorage.setItem("token", response.token);
        
        // Set user data
        setUser({
          id: response.user.id,
          role: response.user.role,
          name: response.user.name
        });
        
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error(response.message || "Login failed");
      }
    },
    onError: (error) => {
      console.error("Login Error:", error);

      queryClient.removeQueries(["ct-admin"]);
      queryClient.removeQueries(["auth"]);
    },

    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return { mutate, error, isError, isPending };
};
