import { useDispatch, useSelector } from "react-redux";
import GlobalTitle from "../../components/layout/GlobalTitle/GlobalTitle";
import { useEffect } from "react";
import { actGetAllPosts } from "../../store/posts/postsActions";
import { cleanPosts } from "../../store/posts/postsSlice";
import PostList from "../../components/post/PostList/PostList";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(actGetAllPosts({}));
    return () => {
      dispatch(cleanPosts());
    };
  }, [dispatch]);

  return (
    <section className="mySection p-4">
      <GlobalTitle title="Posts" />

      <PostList posts={posts} />
    </section>
  );
};

export default Posts;
