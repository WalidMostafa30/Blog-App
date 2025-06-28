import { Link } from "react-router-dom";
import GlobalTitle from "../../components/layout/GlobalTitle/GlobalTitle";
import { FaUsers } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaTableList } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actGetCategoriesCount } from "../../store/categories/categoriesActions";
import { actGetCommentsCount } from "../../store/comments/commentsActions";
import { actGetPostsCount } from "../../store/posts/postsActions";
import { actGetUsersCount } from "../../store/users/usersActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { categoriesCount } = useSelector((state) => state.categories);
  const { postsCount } = useSelector((state) => state.posts);
  const { commentsCount } = useSelector((state) => state.comments);
  const { usersCount } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(actGetCategoriesCount());
    dispatch(actGetPostsCount());
    dispatch(actGetCommentsCount());
    dispatch(actGetUsersCount());
  }, [dispatch]);

  const dashboardList = [
    {
      title: "Users",
      icon: <FaUsers />,
      link: "/admin-dashboard/users",
      count: usersCount,
    },
    {
      title: "Categories",
      icon: <FaTableList />,
      link: "/admin-dashboard/categories",
      count: categoriesCount,
    },
    {
      title: "Posts",
      icon: <BsFilePost />,
      link: "/admin-dashboard/posts",
      count: postsCount,
    },
    {
      title: "Comments",
      icon: <BiSolidCommentDetail />,
      link: "/admin-dashboard/comments",
      count: commentsCount,
    },
  ];

  return (
    <>
      <GlobalTitle title="Admin Dashboard" />

      <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
        {dashboardList.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="flex flex-col items-center gap-1 lg:gap-3 p-4 rounded-xl shadow-lg shadow-main-clr/30 hover:shadow-xl hover:shadow-main-clr/40 duration-200"
          >
            <span className="text-6xl lg:text-8xl text-main-clr">
              {item.icon}
            </span>
            <h3 className="text-2xl lg:text-4xl font-bold">{item.title}</h3>
            <p className="text-lg lg:text-xl font-semibold">
              Number of {item.title}:{" "}
              <span className="text-main-clr text-xl lg:text-3xl font-bold">
                {item.count}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
