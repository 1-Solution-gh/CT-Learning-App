import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { data: user, isLoading, error , isSuccess} = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (replaces cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    // enabled: false, 
  });

  // Navigate to login if user is null/undefined
  // if (!user && !isLoading) {
  //   // navigate('/');
  // }

  const isAuthenticated = !!user && !!user.id;
  const isAuthReady = user !== undefined || isSuccess;
  const updateUser = (userData) => {
    queryClient.setQueryData(['user'], userData);
  };

  const clearUser = () => {
    queryClient.removeQueries(['user']);
    queryClient.removeQueries(['auth']);
    navigate('/');
  };

  // save user auth in browser 
  const setUser = (userData) => {
    queryClient.setQueryData(['user'], userData);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    isAuthReady,
    error,
    updateUser,
    clearUser,
    setUser
  };
};