import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, {
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

export function useFetchStudents(endpoint) {
    const query = useQuery({
        queryKey: ["students", endpoint], // Include endpoint in queryKey for proper caching
        queryFn: () => fetchData(endpoint),
        enabled: !!endpoint, // Only run query when endpoint is provided
        retry: 1,
        staleTime: 300000,
    });

    const { data, error, isLoading, isError } = query;
    if (isError) {
        console.error("Error fetching data:", error);
    }
    return { data, error, isLoading };
}
