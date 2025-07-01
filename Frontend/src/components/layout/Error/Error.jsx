import { FaBoxOpen } from "react-icons/fa";
import { MdError } from "react-icons/md";

const Error = ({
  errorMsg = "Something went wrong",
  errorType = "server" | "empty",
}) => {
  return (
    <article className="flex items-center justify-center w-full">
      <div className="p-4 mx-auto">
        {errorType === "empty" ? (
          <FaBoxOpen className="text-8xl text-main-clr mx-auto" />
        ) : (
          <MdError className="text-8xl text-main-clr mx-auto" />
        )}
        <h3 className="text-3xl font-bold text-center mt-4">{errorMsg}</h3>
      </div>
    </article>
  );
};

export default Error;
