/* eslint-disable */

import { Navigate } from "react-router";
import MainLayout from "./layout/main/MainLayout";
import Login from "./pages/Login";

const routes = (isLoggedIn, user) => [
  {
    path: "search",
    element: !isLoggedIn ? <Navigate to="/login" /> : <MainLayout user={user} pageName="Search" />,
  },
  {
    path: "explore",
    element: !isLoggedIn ? <Navigate to="/login" /> : <MainLayout user={user} pageName="Explore" />,
  },
  {
    path: "login",
    element: isLoggedIn ? <Navigate to="/" /> : <Login />,
  },

  {
    path: "m/:memeId",
    element: !isLoggedIn ? <Navigate to="/login" /> : <MainLayout user={user} pageName="MemeDetail" />,
  },

  {
    path: ":username",
    element: !isLoggedIn ? <Navigate to="/login" /> : <MainLayout user={user} pageName="Profile" />,
  },
  {
    path: "/",
    element: !isLoggedIn ? <Navigate to="/login" /> : <MainLayout pageName="Home" user={user} />,
  },
];

export default routes;
