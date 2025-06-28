import EmptySvg from "../../../assets/svg/emptySvg.svg?react";
import ServerErrorSvg from "../../../assets/svg/503ErrorSvg.svg?react";

const Error = ({
  errorMsg = "Something went wrong",
  errorType = "server" | "empty",
}) => {
  return (
    <article className="flex items-center justify-center w-full">
      <div className="p-4 mx-auto">
        {errorType === "empty" ? (
          <EmptySvg className="w-64" />
        ) : (
          <ServerErrorSvg className="w-64" />
        )}
        <h3 className="text-3xl font-bold text-center">{errorMsg}</h3>
      </div>
    </article>
  );
};

export default Error;
