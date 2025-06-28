import { MdOutlineComment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { actLikePost } from "../../../store/posts/postsActions";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";

const PostActions = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [animate, setAnimate] = useState(false);

  const isLiked = post?.likes?.includes(user?._id);

  const handleLike = () => {
    setAnimate(true);
    dispatch(actLikePost(post._id));
  };

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [animate]);

  return (
    <div className="flex items-center justify-between gap-2 py-2 border-y-2 border-gray-200">
      <div className="text-xl lg:text-2xl font-semibold flex items-center gap-2">
        <button
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleLike}
        >
          <span
            className={`text-main-clr transition-transform duration-300 ${
              animate ? "scale-125" : "scale-100"
            }`}
          >
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          </span>
          Likes
        </button>
        <span className="text-main-clr">{post?.likes?.length}</span>
      </div>

      <div className="text-xl lg:text-2xl font-semibold flex items-center gap-2">
        <button className="flex items-center gap-1">
          <span>
            <MdOutlineComment />
          </span>
          Comments
        </button>
        <span className="text-main-clr">{post?.comments?.length}</span>
      </div>
    </div>
  );
};

export default PostActions;
