import GlobalTitle from "../../components/layout/GlobalTitle/GlobalTitle";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  actDeleteComment,
  actGetAllComments,
} from "../../store/comments/commentsActions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { cleanComments } from "../../store/comments/commentsSlice";
import Loading from "../../components/layout/Loading/Loading";
import Error from "../../components/layout/Error/Error";

const DashboardComments = () => {
  const { comments, loading, error } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetAllComments());
    return () => dispatch(cleanComments());
  }, [dispatch]);

  const handleDeleteComment = async (id) => {
    const result = await Swal.fire({
      title: "Delete Comment",
      text: "Are you sure you want to delete this comment? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(actDeleteComment(id)).unwrap();
        toast.success(`Comment deleted successfully`);
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
      <GlobalTitle title="Comments" />

      {comments.length > 0 ? (
        <div className="space-y-2 max-w-4xl mx-auto">
          {comments.map((comment) => (
            <div key={comment._id} className="dashboardCard">
              <h3 className="font-semibold text-xl flex-1 line-clamp-1">
                {comment.text}
              </h3>

              <div className="flex items-center gap-2">
                <Link
                  to={`/posts/post-details/${comment.postId}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center 
                            text-2xl text-white bg-main-clr hover:brightness-75 duration-200 cursor-pointer"
                >
                  <FaEye />
                </Link>
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center 
                            text-2xl text-white bg-red-700 hover:brightness-75 duration-200 cursor-pointer"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Error errorType={"empty"} errorMsg={"No comments found."} />
      )}
    </>
  );
};

export default DashboardComments;
