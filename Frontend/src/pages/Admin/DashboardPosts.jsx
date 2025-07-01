import GlobalTitle from "../../components/layout/GlobalTitle/GlobalTitle";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { actDeletePost, actGetAllPosts } from "../../store/posts/postsActions";
import { cleanPosts } from "../../store/posts/postsSlice";
import Loading from "../../components/layout/Loading/Loading";
import Error from "../../components/layout/Error/Error";

const DashboardPosts = () => {
  const { posts, loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetAllPosts({}));
    return () => dispatch(cleanPosts());
  }, [dispatch]);

  const handleDeletePost = async (id) => {
    const result = await Swal.fire({
      title: "Delete Post",
      text: "Are you sure you want to delete this post? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(actDeletePost(id)).unwrap();
        toast.success(`Post deleted successfully`);
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
      <GlobalTitle title="Posts" />

      {posts.length > 0 ? (
        <div className="space-y-2 max-w-4xl mx-auto">
          {posts.map((post) => (
            <div key={post._id} className="dashboardCard">
              <span className="w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src={post.image.url}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </span>

              <h3 className="font-semibold text-xl">{post.title}</h3>

              <h3 className="font-semibold text-xl text-main-clr">
                {post.category}
              </h3>

              <div className="flex items-center gap-2">
                <Link
                  to={`/posts/post-details/${post._id}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center 
                            text-2xl text-white bg-main-clr hover:brightness-75 duration-200 cursor-pointer"
                >
                  <FaEye />
                </Link>
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center 
                            text-2xl text-white bg-red-700 hover:brightness-75 duration-200 cursor-pointer"
                  onClick={() => handleDeletePost(post._id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Error errorType={"empty"} errorMsg={"No posts yet.."} />
      )}
    </>
  );
};

export default DashboardPosts;
