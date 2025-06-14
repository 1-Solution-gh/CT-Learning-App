import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { BASE_URL } from "@/utils/constants";

const fetchData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/adminmanagecoursesapi.php`, {
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



export function useFetchCourses() {
    const query = useQuery({
      queryKey: ["courses"],
      queryFn: () => fetchData(),
    //   enabled: !!endpoint, 
      retry: 1, 
      staleTime: 300000,
      
    });
  
    
    const { data, error, isPending , isError } = query;
    if (isError) {
      console.error("Error fetching data:", error);
    }
    return { data, error, isPending }; 
  }
