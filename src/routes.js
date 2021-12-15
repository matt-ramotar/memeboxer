/* eslint-disable */

import MainLayout from "./layout/main/MainLayout";

const routes = (isLoggedIn, user) => [
  {
    path: "/",
    element: <MainLayout pageName="Home" />,
  },
];

export default routes;
