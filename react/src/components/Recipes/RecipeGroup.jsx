import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";

import classes from "./RecipeGroup.module.css";

function RecipeGroup({ url }) {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    setLoading(true);

    axiosClient
      .get(`/recipes${url}?take=4`)
      .then(({ data }) => {
        setLoading(false);
        if (data.message != null) {
          setMessage(data.message);
        } else {
          setRecipes(data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className={`ml-6 ${classes.recipesContainer}`}>
      {loading && <p className={classes.message}>Loading recipes...</p>}
      {!loading && message && <p className={classes.message}>{message}</p>}
      {!loading &&
        Object.keys(recipes).length > 0 &&
        recipes.map((recipe) => (
          <Link
            to={`/recipes/${recipe.id}`}
            className={classes.recipe}
            key={recipe.id}
          >
            <p>{recipe.name}</p>
          </Link>
        ))}
    </div>
  );
}

export default RecipeGroup;