import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import RedirectIfAuth from "../components/RoutesProtect/RedirectIfAuth";
import PrivateRoute from "../components/RoutesProtect/PrivateRoute";
import AdminRoute from "../components/RoutesProtect/AdminRoute";
import Loading from "../components/layout/Loading/Loading";

// Lazy-loaded pages
const Home = React.lazy(() => import("../pages/Home/Home"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const Register = React.lazy(() => import("../pages/Register/Register"));
const Posts = React.lazy(() => import("../pages/Posts/Posts"));
const AdminDashboard = React.lazy(() =>
  import("../pages/Admin/AdminDashboard")
);
const CreateNewPost = React.lazy(() =>
  import("../pages/CreateNewPost/CreateNewPost")
);
const ForgotPassword = React.lazy(() =>
  import("../pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("../pages/ResetPassword/ResetPassword")
);
const About = React.lazy(() => import("../pages/About/About"));
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const PostDetails = React.lazy(() =>
  import("../pages/PostDetails/PostDetails")
);
const DashboardComments = React.lazy(() =>
  import("../pages/Admin/DashboardComments")
);
const Admin = React.lazy(() => import("../pages/Admin/Admin"));
const DashboardUsers = React.lazy(() =>
  import("../pages/Admin/DashboardUsers")
);
const DashboardPosts = React.lazy(() =>
  import("../pages/Admin/DashboardPosts")
);
const DashboardCategories = React.lazy(() =>
  import("../pages/Admin/DashboardCategories")
);
const Categories = React.lazy(() => import("../pages/Categories/Categories"));
const ErrorPage = React.lazy(() => import("../pages/ErrorPage/ErrorPage"));

// Wrapper to add suspense fallback
const withSuspense = (component) => (
  <Suspense fallback={<Loading />}>{component}</Suspense>
);

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: "about", element: withSuspense(<About />) },
      { path: "posts", element: withSuspense(<Posts />) },
      {
        path: "posts/post-details/:id",
        element: withSuspense(<PostDetails />),
      },
      {
        path: "posts/categories/:category",
        element: withSuspense(<Categories />),
      },

      {
        path: "admin-dashboard",
        element: withSuspense(
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
        children: [
          { index: true, element: withSuspense(<AdminDashboard />) },
          { path: "users", element: withSuspense(<DashboardUsers />) },
          { path: "posts", element: withSuspense(<DashboardPosts />) },
          {
            path: "categories",
            element: withSuspense(<DashboardCategories />),
          },
          { path: "comments", element: withSuspense(<DashboardComments />) },
        ],
      },

      { path: "profile/:userId", element: withSuspense(<Profile />) },

      {
        path: "create-post",
        element: withSuspense(
          <PrivateRoute>
            <CreateNewPost />
          </PrivateRoute>
        ),
      },

      {
        path: "login",
        element: withSuspense(
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        ),
      },
      {
        path: "register",
        element: withSuspense(
          <RedirectIfAuth>
            <Register />
          </RedirectIfAuth>
        ),
      },

      { path: "forgot-password", element: withSuspense(<ForgotPassword />) },
      { path: "reset-password", element: withSuspense(<ResetPassword />) },
      { path: "*", element: withSuspense(<ErrorPage />) },
    ],
  },
]);

// Main Router Provider
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
