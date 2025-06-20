import { BASE_URL } from "@/utils/constants"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// import { error } from "console"


const approvedInstructor = async ({ applicationId, adminId }) => {
//   console.log("Approving application:", { applicationId, adminId });

  const { data } = await axios.put(
    `${BASE_URL}/instructor-applications/approve/${applicationId}`,
    { admin_id: adminId }
  );
  return data;
};
  


export const useApprovedInstructor = () => {
    const query  = useMutation ({
        mutationFn : approvedInstructor,
        onSuccess : (response) => {
            console.log ("Response", response)
        },

        onError: (error) => {
            console.log(error)
        }
    })
   const  {mutate, isError, error, isPending} = query
    return {mutate, isError, error, isPending}
}


