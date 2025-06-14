import { BASE_URL } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./useUser";

const postLoginData = async ({ email, password }) => {
  const response = await axios.post(
    `${BASE_URL}/adminloginapi.php`,
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
    onSuccess: (data) => {
      console.log("Login Success:", data);

      if (data.status === "success" && data.user) {
        setUser(data.user);
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error(data.message || "Login failed");
      }
    },
    onError: (error) => {
      console.error("Login Error:", error);

      queryClient.removeQueries(["user"]);
      queryClient.removeQueries(["auth"]);
    },

    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return { mutate, error, isError, isPending };
};
