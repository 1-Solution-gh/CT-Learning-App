import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { BASE_URL } from "@/utils/constants";

const fetchData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/adminmanagestudentsapi.php`, {
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



export function useFetchStudents() {
    const query = useQuery({
      queryKey: ["students"],
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
