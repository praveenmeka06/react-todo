import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>loading...</div>;
  }
  return currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
