import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Recipes from "./views/Recipes";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/recipes" />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
