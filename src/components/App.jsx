import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import GetStarted from "./GetStarted";
import Header from "./Header";
import History from "./History";
import Info from "./Info";
import NewSet from "./NewSet";
import NotFound from "./NotFound";
import RootLayout from "./RootLayout";
import Save from "./Save";
import Score from "./Score";
import SetDetail from "./SetDetail";
import Sets from "./Sets";
import Setup from "./Setup";
import Stats from "./Stats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GetStarted />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "/new",
        element: <NewSet />,
      },
      {
        path: "/sets",
        element: <Sets />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/history/:id",
        element: <History />,
      },
      {
        path: "/set/:id",
        element: <SetDetail />,
      },
      {
        path: "/save/:id",
        element: <Save />,
      },
      {
        path: "/score/:id",
        element: <Score />,
      },
      {
        path: "/setup/:id",
        element: <Setup />,
      },
      {
        path: "/",
        element: <NotFound />,
      },
    ],
  },
  {},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Header />
    <RouterProvider router={router} />
  </>
);
