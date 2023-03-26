import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Recipes from "./views/Recipes/Recipes";
import MyBar from "./views/MyBar/MyBar";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import Register from "./views/Register";
import AddIngredients from "./views/MyBar/AddIngredients";
import Recipe from "./views/Recipes/Recipe";
import Dashboard from "./views/Dashboard";
import AddRecipe from "./views/Recipes/AddRecipe";

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
        <Route path="/add-ingredients" element={<AddIngredients />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
