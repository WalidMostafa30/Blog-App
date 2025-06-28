import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { IoHomeSharp } from "react-icons/io5";
import { BsFilePostFill } from "react-icons/bs";

const NavBar = ({ activeNav, setActiveNav, user }) => {
  return (
    <nav
      className={`fixed left-0 top-[var(--header-height)] z-50 w-screen h-[calc(100dvh-var(--header-height))] 
              bg-bg-clr flex flex-col items-center justify-center gap-4 
              duration-500 
              xl:static xl:flex-row xl:justify-start xl:w-2/5 xl:h-full 
              ${
                activeNav
                  ? ""
                  : "translate-y-full opacity-0 xl:translate-y-0 xl:opacity-100"
              }`}
    >
      <NavLink to={"/"} onClick={() => setActiveNav(false)} className="navLink">
        <span className="text-main-clr">
          <IoHomeSharp />
        </span>
        Home
      </NavLink>
      <NavLink
        to={"/posts"}
        onClick={() => setActiveNav(false)}
        className="navLink"
      >
        <span className="text-main-clr">
          <BsFilePostFill />
        </span>
        Posts
      </NavLink>
      {user?.isAdmin && (
        <NavLink
          to={"/admin-dashboard"}
          onClick={() => setActiveNav(false)}
          className="navLink"
        >
          <span className="text-main-clr">
            <MdSpaceDashboard />
          </span>
          Dashboard
        </NavLink>
      )}

      {user && (
        <NavLink
          to={"/create-post"}
          onClick={() => setActiveNav(false)}
          className="navLink"
        >
          <span className="text-main-clr">
            <LuNotebookPen />
          </span>
          Create Post
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
