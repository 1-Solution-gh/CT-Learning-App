import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

// Reusable API function
export const updateInstructorStatus = async ({ id, action }) => {
  try {
    const response = await axios.post(`${BASE_URL}/approveinstructorapi.php`, {
      id,
      action,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useHandleInstructorApplication = () => {
  return useMutation({
    mutationFn: ({id, action}) =>  updateInstructorStatus({id, action}),
    onSuccess: (data) => {
      alert(data.message);
      console.log("Success:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
      alert(error?.response?.data?.message || "An error occurred.");
    },
  });
};
