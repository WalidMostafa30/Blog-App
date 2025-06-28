import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openShowImageModal } from "../../../store/modals/modalsSlice";

const PostContent = ({ post, details }) => {
  const dispatch = useDispatch();
  const handleOpenImageModal = () => {
    dispatch(openShowImageModal({ image: post.image.url }));
  };

  return (
    <>
      <div
        className="w-full aspect-square cursor-pointer"
        onClick={handleOpenImageModal}
      >
        <img
          src={post.image?.url}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between gap-2">
        <h3 className={`text-3xl font-semibold ${!details && "line-clamp-1"}`}>
          {post.title}
        </h3>
        <Link
          to={`/posts/categories/${post.category}`}
          className="bg-main-clr text-white text-lg font-semibold rounded-full px-4 content-center capitalize"
        >
          {post.category}
        </Link>
      </div>
      <p className={`${!details && "line-clamp-3"}`}>{post.description}</p>
    </>
  );
};

export default PostContent;
