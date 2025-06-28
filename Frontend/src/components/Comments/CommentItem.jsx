import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { actDeleteComment } from "../../store/comments/commentsActions";
import DropDown from "../common/DropDown/DropDown";
import { HiDotsVertical } from "react-icons/hi";
import { openUpdateCommentModal } from "../../store/modals/modalsSlice";
import Swal from "sweetalert2";
import UserTimeSection from "../common/UserTimeSection/UserTimeSection";

const CommentItem = ({ comment }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [commentMenu, setCommentMenu] = useState(false);

  const handleUpdateCommentModal = () => {
    dispatch(
      openUpdateCommentModal({
        commentId: comment?._id,
        initialComment: comment?.text,
      })
    );
    setCommentMenu(false);
  };

  const handleDeleteComment = () => {
    setCommentMenu(false);
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
        dispatch(actDeleteComment(comment?._id));
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };

  return (
    <div className="w-full not-last:border-b-1 border-main-clr/50 py-2">
      <div className="flex items-center justify-between">
        <UserTimeSection
          link={`/profile/${comment?.user?._id}`}
          image={comment?.user?.profilePhoto?.url}
          time={comment?.createdAt}
          userName={comment?.user?.username}
        />

        {user && user?._id === comment?.user?._id && (
          <div className="relative">
            <span
              onClick={() => setCommentMenu(true)}
              className="text-3xl cursor-pointer"
            >
              <HiDotsVertical />
            </span>
            {commentMenu && (
              <DropDown onClose={() => setCommentMenu(false)}>
                <button className="myBtn" onClick={handleUpdateCommentModal}>
                  <span className="text-3xl">
                    <TbEdit />
                  </span>
                  Edit Comment
                </button>

                <button className="myBtn danger" onClick={handleDeleteComment}>
                  <span className="text-3xl">
                    <MdDeleteOutline />
                  </span>
                  Delete Comment
                </button>
              </DropDown>
            )}
          </div>
        )}
      </div>

      <p className="text-lg mt-4">{comment?.text}</p>
    </div>
  );
};

export default CommentItem;
