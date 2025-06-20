import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

const ProtectedRoute = () => {
  const { admin, isAuthenticated, isLoading,  } = useUser();

  console.log("user", isAuthenticated);



  // const isInitialLoading = isLoading && user === undefined;

  const isAuthReady = !isLoading && admin!== undefined;

  if (!isAuthReady) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated ) {
    return <Navigate to="/" replace />;
  } 

    return <Outlet />;
  

 

};

export default ProtectedRoute;