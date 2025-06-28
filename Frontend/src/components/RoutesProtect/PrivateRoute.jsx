import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const {user} = useSelector((state) => state.auth); 

  if (!user) {
    Swal.fire({
      title: "You are not logged in",
      text: "Please log in to access this page.",
      icon: "warning",
    })
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
