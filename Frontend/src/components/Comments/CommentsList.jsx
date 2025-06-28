import { useState } from "react";
import CommentItem from "./CommentItem";

const CommentsList = ({ comments = [] }) => {
  const numberToShow = 5;
  const [visibleCount, setVisibleCount] = useState(numberToShow);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + numberToShow);
  };

  const hasMore = visibleCount < comments.length;

  return (
    <article className="w-full">
      <div className="flex flex-col">
        {comments.slice(0, visibleCount).map((comment) => (
          <CommentItem key={comment?._id} comment={comment} />
        ))}
      </div>

      {comments.length > 0 && hasMore && (
        <button
          className="text-main-clr font-semibold text-xl cursor-pointer block mx-auto mt-2"
          onClick={handleShowMore}
          disabled={!hasMore}
        >
          View More Comments
        </button>
      )}
    </article>
  );
};

export default CommentsList;
