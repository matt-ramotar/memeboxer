/* eslint-disable */

import { Navigate } from "react-router";
import MainLayout from "./layout/main/MainLayout";
import Login from "./pages/Login";

const routes = (isLoggedIn, user) => [
  {
    path: "explore",
    element: !isLoggedIn ? <Navigate to="/login" /> : <MainLayout user={user} pageName="Explore" />,
  },
  {
    path: "login",
    element: isLoggedIn ? <Navigate to="/" /> : <Login />,
  },

  {
    path: ":userId",
    element: !isLoggedIn ? <Navigate to="/login" /> : <MainLayout user={user} pageName="Profile" />,
  },
  {
    path: "/",
    element: !isLoggedIn ? <Navigate to="/login" /> : <MainLayout pageName="Home" user={user} />,
  },
];

export default routes;
