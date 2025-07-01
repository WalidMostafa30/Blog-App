import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import DropDown from "../../common/DropDown/DropDown";
import { TbEdit } from "react-icons/tb";
import { FaImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  openUpdateImageModal,
  openUpdatePostModal,
} from "../../../store/modals/modalsSlice";
import { actDeletePost } from "../../../store/posts/postsActions";
import Swal from "sweetalert2";
import UserTimeSection from "../../common/UserTimeSection/UserTimeSection";
import { toast } from "react-toastify";

const PostHeader = ({ post, details, postMenu, setPostMenu }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateImageModal = () => {
    dispatch(openUpdateImageModal({ action: "updatePostImage", id: post._id }));
    setPostMenu(false);
  };

  const handleUpdatePostModal = () => {
    dispatch(
      openUpdatePostModal({
        id: post._id,
        initialTitle: post.title,
        initialDescription: post.description,
      })
    );
    setPostMenu(false);
  };

  const handleDeletePost = () => {
    Swal.fire({
      title: "Delete Post",
      text: "Are you sure you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(actDeletePost(post._id));
        navigate(`/`);
        setPostMenu(false);
        toast.success("Post deleted successfully");
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <UserTimeSection
        link={`/profile/${post?.user?._id}`}
        image={post?.user?.profilePhoto?.url}
        userName={post?.user?.username}
        time={post?.createdAt}
      />

      {details && user?._id === post.user?._id && (
        <div className="relative">
          <span
            onClick={() => setPostMenu((prev) => !prev)}
            className="text-3xl cursor-pointer"
          >
            <HiDotsVertical />
          </span>
          {postMenu && (
            <DropDown onClose={() => setPostMenu(false)}>
              <button className="myBtn" onClick={handleUpdatePostModal}>
                <span className="text-3xl">
                  <TbEdit />
                </span>
                Edit Post
              </button>
              <button className="myBtn" onClick={handleUpdateImageModal}>
                <span className="text-3xl">
                  <FaImage />
                </span>
                Edit Image
              </button>
              <button className="myBtn danger" onClick={handleDeletePost}>
                <span className="text-3xl">
                  <MdDeleteOutline />
                </span>
                Delete Post
              </button>
            </DropDown>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;
