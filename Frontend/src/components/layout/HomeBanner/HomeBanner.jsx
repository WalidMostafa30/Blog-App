import { FaUserPlus } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bannerImg from "../../../assets/images/banner.jpg";

const HomeBanner = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <article
      style={{ backgroundImage: `url(${bannerImg})` }}
      className={`bg-main-clr bg-no-repeat bg-cover bg-center h-96 relative`}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-5 text-center text-white px-4">
        <h1 className="text-7xl lg:text-9xl font-bold">Blogify</h1>

        {user ? (
          <>
            <p className="text-xl">
              Create new post and start sharing your stories
            </p>
            <Link to={"/create-post"} className="myBtn">
              <span className="text-2xl">
                <LuNotebookPen />
              </span>
              Create Post
            </Link>
          </>
        ) : (
          <>
            <p className="text-xl">
              Register now and start sharing your stories
            </p>
            <Link to={"/register"} className="myBtn">
              <span className="text-3xl">
                <FaUserPlus />
              </span>
              Register
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

export default HomeBanner;
