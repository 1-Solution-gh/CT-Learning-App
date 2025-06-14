import { useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { BASE_URL } from "@/utils/constants";

const fetchData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-modules.php`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



export function useFetchModules() {
    const query = useQuery({
      queryKey: ["modules"],
      queryFn: () => fetchData(),
    //   enabled: !!endpoint, 
      retry: 1, 
      staleTime: 300000,
      
    });
  
    
    const { data, error, isLoading , isError } = query;
    if (isError) {
      console.error("Error fetching data:", error);
    }
    return { data, error, isLoading }; 
  }


//   add modules 


// import { BASE_URL } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";


const postModuleData = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/create-modules.php`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const usePostModule = () => {
    const queryClient = useQueryClient();
  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: (data) => postModuleData(data),
    onSuccess: (data) => {
      console.log("Login Success:", data);

      queryClient.invalidateQueries(['modules'])
    },
    onError: (error) => {
     console.log("error" , error)
    },

    

  });

  return { mutate, error, isError, isPending };
};
