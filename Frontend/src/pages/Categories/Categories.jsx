import { useParams } from "react-router-dom";
import GlobalTitle from "../../components/layout/GlobalTitle/GlobalTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actGetAllPosts } from "../../store/posts/postsActions";
import { cleanPosts } from "../../store/posts/postsSlice";
import PostList from "../../components/post/PostList/PostList";

const Categories = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(actGetAllPosts({ category }));
    return () => {
      dispatch(cleanPosts());
    };
  }, [dispatch, category]);
  return (
    <section className="mySection p-4">
      <GlobalTitle title={category + " Posts"} />
      <PostList posts={posts} />
    </section>
  );
};

export default Categories;
