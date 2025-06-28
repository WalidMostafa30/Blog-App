import GlobalTitle from "../../components/layout/GlobalTitle/GlobalTitle";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { cleanUsers } from "../../store/users/usersSlice";
import { actGetAllUsers } from "../../store/users/usersActions";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { actDeleteProfile } from "../../store/profile/profileActions";
import { authLogout } from "../../store/auth/authSlice";
import Loading from "../../components/layout/Loading/Loading";
import Error from "../../components/layout/Error/Error";

const DashboardUsers = () => {
  const { users, loading, error } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetAllUsers());
    return () => dispatch(cleanUsers());
  }, [dispatch]);

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Delete User",
      text: "Are you sure you want to delete this user? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(actDeleteProfile(id)).unwrap();
        if (user._id === id) dispatch(authLogout());
        toast.success(`User deleted successfully`);
      } catch (error) {
        console.log(error);
        Swal.fire("Error", error || "Something went wrong", "error");
      }
    }
  };

  if (loading) return <Loading />;

  if (error) return <Error errorMsg={error} />;

  return (
    <>
      <GlobalTitle title="Users" />

      {users.length > 0 ? (
        <div className="space-y-2 max-w-4xl mx-auto">
          {users.map((user) => (
            <div key={user._id} className="dashboardCard">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={user.profilePhoto.url}
                    alt={user.username}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </span>
                <h3 className="font-medium text-xl">{user.username}</h3>
              </div>

              <p>{user.email}</p>

              <div className="flex items-center gap-2">
                <Link
                  to={`/profile/${user._id}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center 
                            text-2xl text-white bg-main-clr hover:brightness-75 duration-200 cursor-pointer"
                >
                  <FaEye />
                </Link>
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center 
                            text-2xl text-white bg-red-700 hover:brightness-75 duration-200 cursor-pointer"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Error errorType={"empty"} errorMsg={"No users found."} />
      )}
    </>
  );
};

export default DashboardUsers;
