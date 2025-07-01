import Error from "../../layout/Error/Error";
import Loading from "../../layout/Loading/Loading";
import Category from "../Category/Category";
import PostItem from "../PostItem/PostItem";

const PostList = ({ posts = [], showCategories = true, loading, error }) => {
  if (loading) return <Loading />;
  if (error) return <Error errorType={"server"} errorMsg={error}/>;

  return (
    <section className="flex items-start gap-4">
      {showCategories && <Category />}

      {posts.length > 0 ? (
        <div className="grid gap-6 lg:gap-10 max-w-3xl mx-auto">
          {posts.map((post) => (
            <PostItem key={post?._id} post={post} />
          ))}
        </div>
      ) : (
        <Error errorType={"empty"} errorMsg={"No posts yet.."} />
      )}
    </section>
  );
};

export default PostList;
