import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import Recipes from "./views/Recipes/Recipes";
import Recipe from "./views/Recipes/Recipe";
import AddRecipe from "./views/Recipes/AddRecipe";
import MyBar from "./views/MyBar/MyBar";
import EditUserIngredients from "./components/MyBar/EditUserIngredients";
import NotFound from "./views/NotFound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<Recipes />}>
          <Route path="/recipes/:id" element={<Recipe />} />
        </Route>
        <Route path="/recipes/create" element={<AddRecipe />} />
        <Route path="/my-bar" element={<MyBar />} />
        <Route path="/add-ingredients" element={<EditUserIngredients />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
