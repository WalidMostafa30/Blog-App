import { useParams } from "react-router-dom";
import PostItem from "../../components/post/PostItem/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actGetSinglePost } from "../../store/posts/postsActions";
import { cleanPosts } from "../../store/posts/postsSlice";
import Loading from "../../components/layout/Loading/Loading";

const PostDetails = () => {
  const { id } = useParams();
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetSinglePost(id));
    return () => {
      dispatch(cleanPosts());
    };
  }, [dispatch, id]);

  return (
    <section className="mySection w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
      {isLoading ? <Loading /> : <PostItem post={post} details={true} />}
    </section>
  );
};

export default PostDetails;
