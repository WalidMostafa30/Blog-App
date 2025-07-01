import { useRef, useState } from "react";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { authLogout } from "../../../store/auth/authSlice";
import DropDown from "../../common/DropDown/DropDown";

const HeaderRight = ({ user }) => {
  const [userDropdown, setUserDropdown] = useState(false);
  const dispatch = useDispatch();
  const triggerRef = useRef(null); 

  const handleUserLogout = () => {
    setUserDropdown(false);
    dispatch(authLogout());
  };

  return (
    <div className="h-full xl:w-2/5 flex items-center justify-end">
      {user ? (
        <div className="relative">
          <button
            ref={triggerRef} 
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setUserDropdown((prev) => !prev)}
          >
            <span className="text-3xl">
              <IoMdArrowDropdown />
            </span>
            <span className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={user.profilePhoto}
                loading="lazy"
                alt=""
                className="w-full h-full object-cover"
              />
            </span>
          </button>

            <DropDown
              open={userDropdown}
              triggerRef={triggerRef} 
              onClose={() => setUserDropdown(false)}
            >
              <h3 className="text-xl font-semibold line-clamp-1 capitalize">
                {user.username}
              </h3>

              <Link
                to={`/profile/${user._id}`}
                className="myBtn"
                onClick={() => setUserDropdown(false)}
              >
                <span className="text-2xl">
                  <FaUser />
                </span>
                Profile
              </Link>
              <button className="myBtn danger" onClick={handleUserLogout}>
                <span className="text-3xl">
                  <IoLogOutOutline />
                </span>
                Logout
              </button>
            </DropDown>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link to={"/login"} className="hidden! md:flex! myBtn light">
            <span className="text-xl lg:text-3xl">
              <IoLogInOutline />
            </span>
            Login
          </Link>
          <Link to={"/register"} className="myBtn">
            <span className="text-xl lg:text-3xl">
              <FaUserPlus />
            </span>
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderRight;