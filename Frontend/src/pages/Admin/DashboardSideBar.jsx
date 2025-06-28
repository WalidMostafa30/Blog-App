import { BiSolidCommentDetail } from "react-icons/bi";
import { BsFilePost } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const DashboardSideBar = () => {
  const dashboardList = [
    {
      name: "Dashboard",
      icon: <MdSpaceDashboard />,
      link: "/admin-dashboard",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      link: "/admin-dashboard/users",
    },
    {
      name: "Posts",
      icon: <BsFilePost />,
      link: "/admin-dashboard/posts",
    },
    {
      name: "Comments",
      icon: <BiSolidCommentDetail />,
      link: "/admin-dashboard/comments",
    },
    {
      name: "Categories",
      icon: <FaTableList />,
      link: "/admin-dashboard/categories",
    },
  ];

  return (
    <aside className="hidden lg:block min-w-56 shadow-[0px_-7px_7px_var(--main-clr)]">
      <nav className="flex flex-col gap-1 w-full p-2">
        {dashboardList.map((item, index) => (
          <NavLink key={index} to={item.link} className="dashboardLink" end>
            <span className="text-3xl">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSideBar;
