import { useState } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import CommentsInput from "../../Comments/CommentsInput";
import CommentsList from "../../Comments/CommentsList";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostItem = ({ post = {}, details = false }) => {
  const { user } = useSelector((state) => state.auth);

  const [postMenu, setPostMenu] = useState(false);

  return (
    <article className="w-full flex flex-col gap-2 p-4 bg-white shadow-lg shadow-main-clr/50 rounded-xl">
      <PostHeader
        post={post}
        details={details}
        postMenu={postMenu}
        setPostMenu={setPostMenu}
      />

      <PostContent post={post} details={details} />

      {details ? (
        <>
          {user ? (
            <>
              <PostActions post={post} />
              <CommentsInput postId={post?._id} />
            </>
          ) : (
            <Link to="/login" className="myBtn light justify-center">
              Login to can add comments and likes
            </Link>
          )}

          {post?.comments?.length > 0 ? (
            <CommentsList comments={post?.comments} />
          ) : (
            <h3 className="text-main-clr text-center text-xl font-semibold">
              No comments yet
            </h3>
          )}
        </>
      ) : (
        <Link
          to={`/posts/post-details/${post._id}`}
          className="text-xl text-main-clr underline mx-auto"
        >
          Read More
        </Link>
      )}
    </article>
  );
};

export default PostItem;
