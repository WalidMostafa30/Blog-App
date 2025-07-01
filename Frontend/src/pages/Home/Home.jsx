import { Link } from "react-router-dom";
import PostList from "../../components/post/PostList/PostList";
import landingBg from "../../assets/images/landingBg.jpg";
import GlobalTitle from "../../components/layout/GlobalTitle/GlobalTitle";
import HomeBanner from "../../components/layout/HomeBanner/HomeBanner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actGetAllPosts } from "../../store/posts/postsActions";
import { cleanPosts } from "../../store/posts/postsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(actGetAllPosts({ pageNumber: 1 }));
    return () => {
      dispatch(cleanPosts());
    };
  }, [dispatch]);

  return (
    <section className="mySection">
      <article
        style={{
          backgroundImage: `url(${landingBg})`,
        }}
        className={`bg-main-clr bg-no-repeat bg-cover bg-center h-[calc(100dvh-var(--header-height))] relative`}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-5 text-center text-white px-4">
          <h1 className="text-7xl lg:text-9xl font-bold">Blogify</h1>
          <p className="text-cyan-50 text-xl max-w-2xl">
            Discover, create, and share inspiring stories. Blogify is your
            personal space to express thoughts, read amazing content, and
            connect with a community of writers.
          </p>
        </div>
      </article>

      <article className="container py-8">
        <GlobalTitle title="Latest Posts" />

        <PostList posts={posts} showCategories={false} loading={isLoading} />

        <Link to="/posts" className="myBtn w-fit mx-auto mt-4">
          View All Posts
        </Link>
      </article>

      <HomeBanner />
    </section>
  );
};

export default Home;
