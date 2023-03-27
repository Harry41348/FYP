import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import Recipes from "./views/Recipes/Recipes";
import Recipe from "./views/Recipes/Recipe";
import CreateRecipe from "./views/Recipes/CreateRecipe";
import EditRecipe from "./views/Recipes/EditRecipe";
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
        <Route path="/recipes/create" element={<CreateRecipe />} />
        <Route path="/recipes/edit/:id" element={<EditRecipe />} />
        <Route path="/my-bar" element={<MyBar />} />
        <Route path="/add-ingredients" element={<EditUserIngredients />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
