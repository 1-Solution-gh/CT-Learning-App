import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { BASE_URL } from "@/utils/constants";

const fetchData = async (endPoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endPoint}`, {
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



export function useFetchUsers(endPoint) {
    const query = useQuery({
      queryKey: [endPoint],
      queryFn: () => fetchData(endPoint),
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
