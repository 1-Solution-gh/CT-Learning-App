import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";



const fetchCourses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/courses/get-courses`, {
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

// GET COURSES
export function useFetchCourses() {
    const query = useQuery({
        queryKey: ["courses-categories"],
        queryFn: () => fetchCourses(),
        retry: 1,
        staleTime: 300000,
    });

    const { data, error, isLoading, isError } = query;
    if (isError) {
        console.error("Error fetching data:", error);
    }
    return { data, error, isLoading };
}


// GET MODULES



// POST course
const postCourseData = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/categories/add-categories`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};



// POST COURSE HOOK
export const usePostCourse = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isError, isPending } = useMutation({
        mutationFn: (data) => postCourseData(data),
        onSuccess: (data) => {
            console.log("Course Creation Success:", data);
            queryClient.invalidateQueries(['courses'])
        },
        onError: (error) => {
            console.log("error", error)
        },
    });

    return { mutate, error, isError, isPending };
};


// UPDATE COURSE STATUS 
const putCourseData = async (data) => {
  const courseId = data.get("course_id");  
  console.log("Sending PUT request for course ID:", courseId);
  console.log("formData on put ", data)
  const response = await axios.put(
      `${BASE_URL}/courses/${courseId}/decision`,
      data,
     
  );
  return response.data;
};

export const useUpdateCourseStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, error, isError, isPending } = useMutation({
      mutationFn: (data) => putCourseData(data),
      onSuccess: (data) => {
          console.log("Course update Success:", data);
          queryClient.invalidateQueries(['courses'])
      },
      onError: (error) => {
          console.log("error", error)
      },
  });

  return { mutate, error, isError, isPending };
};

