/* eslint-disable */

import { Navigate } from "react-router";
import MainLayout from "./layout/main/MainLayout";
import App from "./pages/App";
import Templates from "./pages/App/Templates";
import Login from "./pages/Login";

const routes = (isLoggedIn, user) => [
  {
    path: "app",
    element: !isLoggedIn ? <Navigate to="/login" /> : <App user={user} />,
  },
  {
    path: "templates",
    element: !isLoggedIn ? <Navigate to="/login" /> : <Templates user={user} />,
  },
  {
    path: "login",
    element: isLoggedIn ? <Navigate to="/" /> : <Login />,
  },
  {
    path: "/",
    element: !isLoggedIn ? <Navigate to="/login" /> : <MainLayout pageName="Home" user={user} />,
  },
];

export default routes;
