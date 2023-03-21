import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Recipes from "./views/Recipes";
import MyBar from "./views/MyBar";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import Register from "./views/Register";
import AddIngredients from "./views/AddIngredients";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/my-bar",
        element: <MyBar />,
      },
      {
        path: "/add-ingredients",
        element: <AddIngredients />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
