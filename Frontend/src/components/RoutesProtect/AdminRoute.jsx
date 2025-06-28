import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    Swal.fire({
      title: "You are not an admin",
      text: "You do not have permission to access this page.",
      icon: "warning",
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
