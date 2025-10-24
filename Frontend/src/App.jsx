import Homepage from "./pages/homepage";
import ErrorPage from "./pages/errorpage.jsx";

import { LoginForm } from "./pages/login";
import { SignupForm } from "./pages/signup";
import { Forget_Password } from "./pages/forget-password";
import Reset_password from "./pages/reset-password";

import { createBrowserRouter } from "react-router-dom";

import axios from "axios";
import Write_blog from "./pages/write_blog";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/login",
    element: <LoginForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forget_password",
    element: <Forget_Password />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password/:token",
    element: <Reset_password />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password/:token",
    element: <Reset_password />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog/new",
    element: <Write_blog />,
    errorElement: <ErrorPage />,
  },
]);
