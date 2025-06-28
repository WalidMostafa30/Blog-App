import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch } from "react-redux";
import { actCreateNewComment } from "../../store/comments/commentsActions";

const CommentsInput = ({ postId }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim().length === 0) {
      return;
    }

    dispatch(actCreateNewComment({ text: comment, postId }));
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-1 p-1 shadow-md shadow-main-clr/50 rounded-full my-2"
    >
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="text"
        placeholder="Add a comment..."
        className="w-full px-2 outline-0 text-xl"
      />

      <button
        type="submit"
        className="bg-main-clr text-white text-3xl min-w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
      >
        <IoIosSend />
      </button>
    </form>
  );
};

export default CommentsInput;
