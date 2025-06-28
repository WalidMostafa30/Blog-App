import { Link } from "react-router-dom";
import NotFoundErrorSvg from "../../assets/svg/404ErrorSvg.svg?react";

const ErrorPage = () => {
  return (
    <div className="myContainer mySection flex flex-col items-center justify-center">
      <NotFoundErrorSvg className="w-72" />
      <h3 className="text-4xl font-bold">Page Not Found</h3>
      <p className="text-xl">The page you are looking for does not exist.</p>
      <p className="text-xl">Please check the URL and try again.</p>
      <Link to="/" replace className="myBtn mt-4">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
