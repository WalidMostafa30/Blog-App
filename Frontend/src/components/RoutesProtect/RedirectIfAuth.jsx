import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectIfAuth = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuth;
